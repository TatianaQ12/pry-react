import { ApiStatus } from '../api/status'

export type AvatarSliceType = {
  avatar: Avatar[]
  status: ApiStatus
  errorMessage: string |undefined
}

export type Avatar = {
  photo: any
}
