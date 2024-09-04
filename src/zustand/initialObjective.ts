import { ApiStatus } from "@/types/api/status"
import { InitialObjective } from "@/types/slices/initialObjectiveType"
import { create } from "zustand"

interface IInitialObjective {
    status: string
    initialObjectives: InitialObjective[]
    totalRows: number
    selectedInitialObjective: InitialObjective,
    errorMessage: string | undefined
    actions: {
        onVerifying: () => Promise<void>
        onFetchInitialsObjective: (payload: InitialObjective[]) => Promise<void>
        changeStatus: (payload: ApiStatus) => void
        onSelectedInitialObjective: (payload: InitialObjective) => void
        onSetTotalRows: (payload: number) => void
    }
}

const useInitialObjective = create<IInitialObjective>((set) => ({
    status: ApiStatus.FETCHED,
    initialObjectives: [],
    totalRows: 0,
    selectedInitialObjective: {} as InitialObjective,
    opened: false,
    errorMessage: undefined,
    actions: {
        onVerifying: async () => {
            set(state => ({
                status: ApiStatus.FETCHING,
                initialObjectives: state.initialObjectives,
                errorMessage: undefined
            }))
        },
        onFetchInitialsObjective: async (payload: InitialObjective[]) => {
            set({
                status: ApiStatus.FETCHED,
                initialObjectives: payload,
                errorMessage: undefined
            })
        },
        onSelectedInitialObjective: async (payload: InitialObjective) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                selectedInitialObjective: payload,
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

export const useInitialObjectiveStates = () => {
    return useInitialObjective(state => ({
        status: state.status,
        initialObjectives: state.initialObjectives,
        selectedInitialObjective: state.selectedInitialObjective,
        errorMessage: state.errorMessage,
        totalRows: state.totalRows
    }))
}

export const useInitialObjectiveActions = () => useInitialObjective(state => state.actions)