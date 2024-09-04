type StepStatus = "error" | "finish" | "wait" | "process";

export type Commitee = {
    id: number,
    name: string, 
    description: string,
    objective: string,
    start_date: string,
    end_date: string
    idtype_committee: number
}
export type PaginateTypeCommitee = {
    detail: TypeCommitee [],
    total: number
}
export type TypeCommitee = {
    id: number,
    name: string, 
    description: string,
    idcommittee_template: number,
    template: string,
    idcompany: number,
    rut_company: string,
    company: string,
    status: string
}

export type RequestType = {
    current: number,
    status: StepStatus
}