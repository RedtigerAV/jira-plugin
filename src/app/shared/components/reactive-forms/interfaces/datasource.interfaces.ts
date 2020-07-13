import { Observable } from 'rxjs';

//tslint:disable no-any

export interface IDataSource<TData, TFilter> {
  data$: Observable<Array<TData>>;
  getKey: (item: TData) => any;
  displayWith: (item: TData) => string;
  filterChanged: (value: TFilter) => void;
}

export interface IComponentWithDataSource<TData, TFilter> {
  dataSource: IDataSource<TData, TFilter>;
}
