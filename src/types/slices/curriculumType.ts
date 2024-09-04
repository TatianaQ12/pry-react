import { ApiStatus } from '../api/status'

export type CurriculumSliceType = {
  curriculum: Curriculum[]
  status: ApiStatus
  errorMessage: string |undefined
}

export type Curriculum = {
  name: string
  file: any
}
