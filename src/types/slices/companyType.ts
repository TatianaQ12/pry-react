import { ApiStatus } from "../api/status";

export type CompanyType = {
    status: ApiStatus,
    companies : Company[],
    errorMessage: string | undefined,
    selectedCompany: Company
}

export type Company = {
    id: number,
    registry_number: string,
    business_name: string,
    phone?: string,
    email?: string,
    contact_name?: string,
    contact_email?: string,
    website: string,
    fax?: string,
    main_address: string,
    iddistrict: number
}