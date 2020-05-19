import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@ng-stack/forms';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';
import { BooleanFormState } from '@shared/helpers/types.helper';
import { IActionItem } from '../actions-panel/actions-panel.component';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlPanelComponent implements OnInit {
  @Input() form: FormGroup<ISettingsPanelForm>;
  @Input() hiddenControls: BooleanFormState<ISettingsPanelForm>;
  @Input() actions: IActionItem[];
  @Input() controlsDisplay: 'row' | 'column';

  constructor() { }

  ngOnInit() {
  }

}
