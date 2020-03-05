import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { HeaderActionsDirective } from '@shared/components/header/header';
import { MatButtonModule, MatIconModule } from '@angular/material';



@NgModule({
  declarations: [HeaderComponent, HeaderActionsDirective],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [HeaderComponent, HeaderActionsDirective]
})
export class HeaderModule { }
