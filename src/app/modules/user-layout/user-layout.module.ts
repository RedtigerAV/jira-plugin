import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLayoutComponent } from './user-layout.component';
import { HeaderModule } from '@shared/components/header/header.module';
import { UserLayoutRoutingModule } from './user-layout-routing.module';
import { MainPageModule } from '../main-page/main-page.module';



@NgModule({
  declarations: [UserLayoutComponent],
  imports: [
    CommonModule,
    HeaderModule,
    MainPageModule,
    UserLayoutRoutingModule
  ],
  exports: [UserLayoutComponent]
})
export class UserLayoutModule { }
