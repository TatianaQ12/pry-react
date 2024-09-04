import { ApiStatus } from "@/types/api/status"
import { StateCommittee } from "@/types/slices/stateCommittee"
import { create } from "zustand"

interface IStateCommittee {
    status: string
    statesCommittee: StateCommittee[]
    totalRows: number
    selectedStateCommittee: StateCommittee,
    errorMessage: string | undefined
    actions: {
        onVerifying: () => Promise<void>
        onFetchStatesCommittee: (payload: StateCommittee[]) => Promise<void>
        changeStatus: (payload: ApiStatus) => void
        onSelectedStateCommittee: (payload: StateCommittee) => void
        onSetTotalRows: (payload: number) => void
    }
}

const useStateCommittee = create<IStateCommittee>((set) => ({
    status: ApiStatus.FETCHED,
    statesCommittee: [],
    totalRows: 0,
    selectedStateCommittee: {} as StateCommittee,
    opened: false,
    errorMessage: undefined,
    actions: {
        onVerifying: async () => {
            set(state => ({
                status: ApiStatus.FETCHING,
                statesCommittee: state.statesCommittee,
                errorMessage: undefined
            }))
        },
        onFetchStatesCommittee: async (payload: StateCommittee[]) => {
            set({
                status: ApiStatus.FETCHED,
                statesCommittee: payload,
                errorMessage: undefined
            })
        },
        onSelectedStateCommittee: async (payload: StateCommittee) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                selectedStateCommittee: payload,
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

export const useStateCommitteeStates = () => {
    const { status, statesCommittee, selectedStateCommittee, errorMessage, totalRows } = useStateCommittee(state => ({
        status: state.status,
        statesCommittee: state.statesCommittee,
        selectedStateCommittee: state.selectedStateCommittee,
        errorMessage: state.errorMessage,
        totalRows: state.totalRows
    }))

    return {
        status,
        statesCommittee,
        selectedStateCommittee,
        errorMessage,
        totalRows
    }
}
export const useStateCommitteeActions = () => useStateCommittee(state => state.actions)