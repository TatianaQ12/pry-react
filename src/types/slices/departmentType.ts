export type Department = {
    id: number
    code: string
    name: string
    idcountry: number
    idtimezone: string
    status: string
    provinces: Province[]
}

export type Province = {
    id: number
    code: string
    name: string
    iddepartment: number
    status: string
    districts: District[]
}

export type District = {
    id: number
    code: string
    name: string
    idprovince: number
    status: string
}