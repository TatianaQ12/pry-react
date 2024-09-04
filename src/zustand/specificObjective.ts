import { ApiStatus } from "@/types/api/status"
import { SpecificObjective } from "@/types/slices/specificObjective"
import { create } from "zustand"

interface ISpecificObjective {
    status: string
    specificsObjectives: SpecificObjective[]
    totalRows: number
    selectedSpecificObjective: SpecificObjective,
    errorMessage: string | undefined
    actions: {
        onVerifying: () => Promise<void>
        onFetchSpecificObjective: (payload: SpecificObjective[]) => Promise<void>
        changeStatus: (payload: ApiStatus) => void
        onSelectedSpecificObjective: (payload: SpecificObjective) => void
        onSetTotalRows: (payload: number) => void
    }
}

const useSpecificObjective = create<ISpecificObjective>((set) => ({
    status: ApiStatus.FETCHED,
    specificsObjectives: [],
    totalRows: 0,
    selectedSpecificObjective: {} as SpecificObjective,
    opened: false,
    errorMessage: undefined,
    actions: {
        onVerifying: async () => {
            set(state => ({
                status: ApiStatus.FETCHING,
                specificsObjectives: state.specificsObjectives,
                errorMessage: undefined
            }))
        },
        onFetchSpecificObjective: async (payload: SpecificObjective[]) => {
            set({
                status: ApiStatus.FETCHED,
                specificsObjectives: payload,
                errorMessage: undefined
            })
        },
        onSelectedSpecificObjective: async (payload: SpecificObjective) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                selectedSpecificObjective: payload,
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

export const useSpecificObjectiveStates = () => {
    const { status, specificsObjectives, selectedSpecificObjective, errorMessage, totalRows } = useSpecificObjective(state => ({
        status: state.status,
        specificsObjectives: state.specificsObjectives,
        selectedSpecificObjective: state.selectedSpecificObjective,
        errorMessage: state.errorMessage,
        totalRows: state.totalRows
    }))

    return {
        status,
        specificsObjectives,
        selectedSpecificObjective,
        errorMessage,
        totalRows
    }
}
export const useSpecificObjectiveActions = () => useSpecificObjective(state => state.actions)