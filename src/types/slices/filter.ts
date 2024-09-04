
export type FilterSliceType ={
  filters: Filters
  errorMessage: string |undefined
}

export type Filters = {
  specialties: number[]
  subspecialties: number[]
}