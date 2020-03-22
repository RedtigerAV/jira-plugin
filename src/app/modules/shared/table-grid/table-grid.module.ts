import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableGridComponent } from './table-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [TableGridComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    HttpClientModule
  ],
  exports: [TableGridComponent]
})
export class TableGridModule { }
