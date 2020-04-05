import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JiraApiInterceptor } from '@core/interceptors/jira-api.interceptor';
import { ApiModule as PlatformApiModule } from '@core/api/platform/api.module';
import { ApiModule as SoftwareApiModule } from '@core/api/software/api.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TgSnackbarModule } from '@shared/components/tg-snackbar/tg-snackbar.module';
import { DatesProviders } from '@core/common-configuration/dates.configuration';
import { NgStackFormsModule } from '@ng-stack/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    PlatformApiModule,
    SoftwareApiModule,
    TgSnackbarModule,
    NgStackFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JiraApiInterceptor, multi: true },
    ...DatesProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
