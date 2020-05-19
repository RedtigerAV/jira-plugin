import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsPanelComponent } from './actions-panel.component';



@NgModule({
  declarations: [ActionsPanelComponent],
  exports: [
    ActionsPanelComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ActionsPanelModule { }
