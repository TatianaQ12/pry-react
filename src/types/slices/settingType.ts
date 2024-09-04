import { ApiStatus } from '../api/status'
export type SettingSliceType = {
  setting: Setting[]
  status: ApiStatus
  settingSelected1: any
  settingSelected2: any
  settingIdSelected1: number
  settingIdSelected2: number
  settingDayAdmin: SettingDaysAdmin[]
  errorMessage: string | undefined
  remember: SettingDaysProfessional
  settingKeys:SettingKeysAdmin[]
}
// export type SettingSelected = {
//   setting: Setting
// }
export type Setting = {
  id?: number
  name: string
  status: string
  settingValue: []
}

export enum SettingStatus {
  DEFAULT = 'default',
  REGISTERING = 'registering',
  REGISTERED = 'registered'
}

export type SettingSelected = {
  id: number,
  idsetting: number,
  setting: string,
  idsetting_value: number,
  setting_value: string,
  customer_type: string,
  status: string
}

export type SettingDaysAdmin = {
  id?: number
  limits_reminder_start: number
  limits_reminder_end: number
  status: string
}

export type SettingKeysAdmin = {
  id?: number
  webpay_plus_cc: string
  webpay_plus_api_key: string
  flow_api_key: string
  flow_secret_key: string
}

export type SettingDaysProfessional = {
  id?: number
  idprofessional: number
  days_advance: string
  start_collation: string
  end_collation: string
  status: string
}
