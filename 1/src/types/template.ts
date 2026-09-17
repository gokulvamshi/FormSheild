import type { ApplicationState, ApplicationCategory, ApplicationType } from './application';

export interface StateInfo {
  code: ApplicationState;
  displayName: string;
  capital: string;
  region: string;
  supported: boolean;
}

export interface CategoryInfo {
  code: ApplicationCategory;
  displayName: string;
  icon: string;
  description: string;
  color: string;
}

export interface ApplicationTypeInfo {
  code: ApplicationType;
  displayName: string;
  description: string;
  category: ApplicationCategory;
  estimatedTime: string;
}
