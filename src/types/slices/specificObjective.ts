import { Task } from "./task"

export type SpecificObjective = {
    id: number
    idcommittee: number
    committee: string
    idrrhh: number
    rrhh: string
    n_document_rrhh: string
    idcommittee_state: string
    state: string
    code: string
    name: string
    description: string
    start_date: string
    end_date: string
    order: number
    status: string
    tasks: Task[]
}