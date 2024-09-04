export type Complaint = {
    id: number
    idcomplaint_channel: number
    complaint_channel: string
    identifier: string
    pin: number
    anonymous: string
    idtype_complaint: number
    type_complaint: string
    reported: string
    idcharge: number
    charge: string
    idarea: number
    area: string
    date_happened: string
    description: string
    iduser: number
    user_name: string
    n_document_user: string
    idcompany: number
    company: string
    registry_number_company: string
    status_complaint: number
    status_name: string
    status: string
    created_at: string
}

export type ComplaintHistory = {
    id: number
    idcomplaint: number
    identifier: string
    idaction: number
    action: string
    iduser: number
    user_name: string
    user_n_document: string
    idevidence_complaint: number
    comment: string
    url: string
    detail: string
    description: string
    idcompany: number
    rutCompany: string
    nameCompany: string
    status: string
    created_at: string
}

export type ComplaintEvidence = {
    id: number
    idcomplaint: number
    identifier: string
    iduser: number
    user_name: string
    n_document_user: string
    name: string
    description: string
    url: string
    reviewed: string
    status: string
    created_at: string
};

export type TypeComplaint = {
    id: number
    name: string
    description: string
    idcommittee: number
    committee: string
    idcompany: number
    registry_number_company: string
    company: string
    status: string
}
