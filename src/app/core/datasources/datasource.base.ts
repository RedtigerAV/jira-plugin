import { Observable, ReplaySubject } from 'rxjs';
import { switchMap, debounceTime, startWith, shareReplay } from 'rxjs/operators';
import { IDataSource } from '@shared/components/reactive-forms/interfaces/datasource.interfaces';

export interface IDataSourceConfig {
  // Нужен ли debounce при смене фильтра
  debounce?: boolean;
  // Нужно ли загружать данные при создании
  eagerLoading?: boolean;
}

/**
 * Базовый класс для источников данных, с которыми могут работать реактивные обертки
 * (select, autocomplete, chip-list, dual-list).
 * По умолчанию DataSource являются горячими (данные подгружаются в момент подписки) и не применяют оператор
 * debounceTime при смене фильтра.
 * Некоторые реактивные обертки переопределяют эти свойства через метод setConfig (например AutoComplete).
 * Этот метод работает только в том случае,
 * если DataSource не был сконфигурирован в конструкторе через параметры базового
 * конструктора (пример, DiplomaDataSource).
 */
export abstract class DataSourceBase<TData, TFilter> implements IDataSource<TData, TFilter> {
  public data$: Observable<TData[]>;
  private config: IDataSourceConfig;
  private readonly filter$: ReplaySubject<TFilter>;
  private readonly configuredInConstructor: boolean;

  constructor(config?: IDataSourceConfig) {
    this.config = { debounce: false, eagerLoading: true };

    if (Object.keys(config || {}).length > 0) {
      this.config = { ...this.config, ...config };
      this.configuredInConstructor = true;
    }

    this.filter$ = new ReplaySubject(1);
    this.data$ = this.constructDataObservable();
  }

  // Имеет эффект только если DataSource не был настроен при создании
  public setConfig(config?: IDataSourceConfig): void {
    if (!this.configuredInConstructor) {
      this.config = { ...this.config, ...config };
      this.data$ = this.constructDataObservable();
    }
  }

  public filterChanged(value: TFilter): void {
    this.filter$.next(value);
  }

  // tslint:disable-next-line: no-any
  public abstract getKey(item: TData): any;
  public abstract displayWith(item: TData): string;

  protected abstract getData(filter: TFilter): Observable<TData[]>;

  private constructDataObservable(): Observable<TData[]> {
    let filter$ = this.filter$.asObservable();

    if (this.config.debounce) {
      filter$ = filter$.pipe(debounceTime(500));
    }

    if (this.config.eagerLoading) {
      filter$ = filter$.pipe(startWith(null));
    }

    return filter$.pipe(
      switchMap(filter => this.getData(filter)),
      shareReplay(1)
    );
  }
}
