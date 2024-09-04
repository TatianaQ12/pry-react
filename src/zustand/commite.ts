import { ApiStatus } from "@/types/api/status"
import { Commitee, PaginateTypeCommitee, TypeCommitee } from "@/types/slices/commiteType"
import { create } from "zustand"

interface ICommite {
    status: string
    types: TypeCommitee[]
    totalPaginationTypes: number
    selectedType: TypeCommitee,
    committees: Commitee[]
    totalRowsCommittee: number
    selectedCommittee: Commitee
    errorMessage: string | undefined
    actions: {
        onVerifying: () => Promise<void>
        onFetchTypes: (types: PaginateTypeCommitee) => Promise<void>
        changeStatus: (payload: ApiStatus) => void
        onSelectType: (payload: TypeCommitee) => void
        onFetchCommittee: (payload: Commitee[]) => Promise<void>
        onSelectedCommittee: (payload: Commitee) => void
        onSetTotalRowsCommittee: (payload: number) => void
    }
}

const useCommite = create<ICommite>((set) => ({
    status: ApiStatus.FETCHING,
    types: [],
    totalPaginationTypes: 0,
    selectedType: {} as TypeCommitee,
    committees: [],
    selectedCommittee: {} as Commitee,
    totalRowsCommittee: 0,
    opened: false,
    errorMessage: undefined,
    actions: {
        onVerifying: async () => {
            set(state => ({
                status: ApiStatus.FETCHING,
                types: state.types,
                errorMessage: undefined
            }))
        },
        onFetchTypes: async (payload: PaginateTypeCommitee) => {
            set({
                status: ApiStatus.FETCHED,
                types: payload?.detail,
                totalPaginationTypes: payload?.total ? payload?.total : 0,
                errorMessage: undefined
            })
        },
        onFetchCommittee: async (payload: Commitee[]) => {
            set({
                status: ApiStatus.FETCHED,
                committees: payload,
                errorMessage: undefined
            })
        },
        onSelectType: async (payload: TypeCommitee) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                selectedType: payload,
                errorMessage: undefined
            }))
        },
        onSelectedCommittee: async (payload: Commitee) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                selectedCommittee: payload,
                errorMessage: undefined
            }))
        },
        changeStatus: async (payload: ApiStatus) => {
            set({
                status: payload
            })
        },
        onSetTotalRowsCommittee: async (payload: number) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                totalRows: payload,
                errorMessage: undefined
            }))
        },
    }
}))

export const useCommiteStates = () => {
    const { status, types, selectedType, totalPaginationTypes, errorMessage, committees, selectedCommittee, 
     totalRowsCommittee } = useCommite(state => ({
        status: state.status,
        types: state.types,
        totalPaginationTypes: state.totalPaginationTypes,
        selectedType: state.selectedType,
        errorMessage: state.errorMessage,
        committees: state.committees,
        selectedCommittee: state.selectedCommittee,
        totalRowsCommittee: state.totalRowsCommittee
    }))

    return {
        status,
        types,
        totalPaginationTypes,
        selectedType,
        errorMessage,
        committees,
        selectedCommittee,
        totalRowsCommittee
    }
}
export const useCommiteActions = () => useCommite(state => state.actions)