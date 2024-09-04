
export type Rule = {
  id: number
  name: string
  status: string
}


export type ViewFront = {
  id: number
  name: string
  idviewType: number,
  idmodule: number,
  type: string,
  type_name: string,
  url_event: string,
  icon: string
  status: string
  detail: DetailView
}

type DetailView = {
  id: number
  idviewfront: number
  idsrole: string
  status: string
}
