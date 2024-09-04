// material-ui

export type LinkTarget = '_blank' | '_self' | '_parent' | '_top'

// amit

export type KeyedObject = {
  [key: string]: string | number | KeyedObject | any
}
//common
export * from './common/common'

//typeComponents
export * from './typeComponents/NavSection'

//local storage
export * from './local-st/localStorage'

//slices
export * from './slices/authType'
export * from './slices/notificationType'

//roles
export * from './roles/roleTypes'

