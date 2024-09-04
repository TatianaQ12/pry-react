export type InitialObjective = {
    id: number
    name: string
    description: string
    status: string
    initialTasks: InitialTask[]
}

export type InitialTask = {
    id: number
    name: string
    description: string
}