import { ApiStatus } from "@/types/api/status"
import { InitialTask } from "@/types/slices/initialObjectiveType"
import { create } from "zustand"

interface IInitialTask {
    status: string
    initialTaks: InitialTask[]
    totalRows: number
    selectedInitialTasks: InitialTask,
    errorMessage: string | undefined
    actions: {
        onVerifying: () => Promise<void>
        onFetchInitialsTasks: (payload: InitialTask[]) => Promise<void>
        changeStatus: (payload: ApiStatus) => void
        onSelectedInitialTask: (payload: InitialTask) => void
        onSetTotalRows: (payload: number) => void
    }
}

const useInitialTask = create<IInitialTask>((set) => ({
    status: ApiStatus.FETCHED,
    initialTaks: [],
    totalRows: 0,
    selectedInitialTasks: {} as InitialTask,
    opened: false,
    errorMessage: undefined,
    actions: {
        onVerifying: async () => {
            set(state => ({
                status: ApiStatus.FETCHING,
                initialTaks: state.initialTaks,
                errorMessage: undefined
            }))
        },
        onFetchInitialsTasks: async (payload: InitialTask[]) => {
            set({
                status: ApiStatus.FETCHED,
                initialTaks: payload,
                errorMessage: undefined
            })
        },
        onSelectedInitialTask: async (payload: InitialTask) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                selectedInitialTasks: payload,
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

export const useInitialTaskStates = () => {
    return useInitialTask(state => ({
        status: state.status,
        initialTaks: state.initialTaks,
        selectedInitialTasks: state.selectedInitialTasks,
        errorMessage: state.errorMessage,
        totalRows: state.totalRows
    }))
}

export const useInitialTaskActions = () => useInitialTask(state => state.actions)