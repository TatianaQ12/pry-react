import { ApiStatus } from "@/types/api/status"
import { Task } from "@/types/slices/task"
import { create } from "zustand"

interface ITask {
    status: string
    tasks: Task[]
    totalRows: number
    selectedTask: Task,
    errorMessage: string | undefined
    actions: {
        onVerifying: () => Promise<void>
        onFetchTasks: (payload: Task[]) => Promise<void>
        changeStatus: (payload: ApiStatus) => void
        onSelectedTask: (payload: Task) => void
        onSetTotalRows: (payload: number) => void
    }
}

const useTask = create<ITask>((set) => ({
    status: ApiStatus.FETCHED,
    tasks: [],
    totalRows: 0,
    selectedTask: {} as Task,
    opened: false,
    errorMessage: undefined,
    actions: {
        onVerifying: async () => {
            set(state => ({
                status: ApiStatus.FETCHING,
                tasks: state.tasks,
                errorMessage: undefined
            }))
        },
        onFetchTasks: async (payload: Task[]) => {
            set({
                status: ApiStatus.FETCHED,
                tasks: payload,
                errorMessage: undefined
            })
        },
        onSelectedTask: async (payload: Task) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                selectedTask: payload,
                errorMessage: undefined
            }))
        },
        changeStatus: async (payload: ApiStatus) => {
            set({
                status: payload
            })
        },
        onSetTotalRows: async (payload: number) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                totalRows: payload,
                errorMessage: undefined
            }))
        },
    }
}))

export const useTaskStates = () => {
    const { status, tasks, selectedTask, errorMessage, totalRows } = useTask(state => ({
        status: state.status,
        tasks: state.tasks,
        selectedTask: state.selectedTask,
        errorMessage: state.errorMessage,
        totalRows: state.totalRows
    }))

    return {
        status,
        tasks,
        selectedTask,
        errorMessage,
        totalRows
    }
}
export const useTaskActions = () => useTask(state => state.actions)