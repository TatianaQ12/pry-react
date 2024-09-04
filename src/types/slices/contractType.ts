export type Contract = {
    id: number
    title: string
    description: string
    pdf_url: string
    idcompany: number
    rut_company: string
    company: string
    status: string
    structure: ContractStructure[]
}

export type ContractStructure = {
    id: number
    idcontract: number
    contract: string
    contract_description: string
    idcompany: number
    subtitle: string
    description: string
    order: number
    status: string
}

export type SignedContract = {
    id: number
    idcontract: number
    contract: string
    contract_description: string
    idcompany: number
    idrrhh: number
    rrhh_n_document: string
    rrhh: string
    start_date: string
    end_date: string
    url: string
    ip: string
    iduser: number
    user_name: string
    user_n_document: string
    status: string
}