import { ApiStatus } from '../api/status'
export type settingProfType = {
  setting: Setting[]
  status: ApiStatus
  errorMessage: string | undefined
  settingKeys:SettingKeysAdmin[]
}

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

export type SettingKeysAdmin = {
  id?: number
  webpay_plus_cc: string
}

