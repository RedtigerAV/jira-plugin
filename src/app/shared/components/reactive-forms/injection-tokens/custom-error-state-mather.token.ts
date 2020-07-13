import { InjectionToken } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material';

export const CUSTOM_ERROR_STATE_MATCHER = new InjectionToken('CUSTOM_ERROR_STATE_MATCHER', {
  providedIn: 'root',
  factory: () => new ErrorStateMatcher()
});
