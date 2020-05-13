import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { LOCALE_ID, Provider } from '@angular/core';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';

const MOMENT_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    monthYearLabel: 'MMM YYYY'
    // See DateFormats for other required formats.
  }
};

registerLocaleData(localeRu);

export const DatesProviders: Provider[] = [
  { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
  { provide: MAT_DATE_FORMATS, useValue: MOMENT_FORMATS },
  { provide: LOCALE_ID, useValue: 'ru' }
];

export const dateFormat = 'yyyy/MM/dd HH:mm';
