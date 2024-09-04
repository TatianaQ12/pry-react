export type ViewSliceType = {
  status: 'fetching' | 'fetched' | 'posting' | 'error'
  views: View[]
}

export type View = {
  id: number
  name: string
  idviewType: number
  viewType: string
  idmodule: number
  module: string
  type: string | number
  type_name: string
  url_event: string
  status: string
}

export type getViewPayload = {
  idviewfront?: number
  idsmembership?: string
  perPage?: number
  page?: number
}

export type ViewType = {
  id: number
  name: string
  status: string
}