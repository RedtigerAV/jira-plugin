import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableActionsComponent } from './table-actions.component';



@NgModule({
  declarations: [TableActionsComponent],
  imports: [
    CommonModule
  ],
  exports: [TableActionsComponent]
})
export class TableActionsModule { }
