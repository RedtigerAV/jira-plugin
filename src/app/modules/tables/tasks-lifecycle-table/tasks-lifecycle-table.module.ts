import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksLifecycleTableComponent } from './tasks-lifecycle-table.component';
import { TasksLifecycleTableRoutingModule } from './tasks-lifecycle-table-routing.module';
import { HeaderModule } from '@shared/components/header/header.module';
import { MatButtonModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { TableSettingsModule } from '../../shared/table-settings/table-settings.module';
import { NgStackFormsModule } from '@ng-stack/forms';
import { TgCardModule } from '@shared/components/tg-card/tg-card.module';
import { TableActionsModule } from '../../shared/table-actions/table-actions.module';



@NgModule({
  declarations: [TasksLifecycleTableComponent],
  imports: [
    CommonModule,
    TasksLifecycleTableRoutingModule,
    HeaderModule,
    TgCardModule,
    MatButtonModule,
    MatIconModule,
    TableSettingsModule,
    NgStackFormsModule,
    TableActionsModule,
    MatProgressSpinnerModule
  ],
  exports: [TasksLifecycleTableComponent]
})
export class TasksLifecycleTableModule { }
