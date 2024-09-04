export enum LocalStorageKey {
  TOKEN_JWT = 'tokenjwt',
  THEME_MODE = 'thememode',
  DATA_USER  = 'datauser',
  PROFESSIONAL_FILTER = 'professionalFilter',
  RUTA = 'ruta'
}

export type loginLocalStorage = {
  navigators: any
  subNavigators: any
  userData: any
  userToogleMenu: any
  access_token: any
}