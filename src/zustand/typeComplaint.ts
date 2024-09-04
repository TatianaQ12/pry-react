import { ApiStatus } from "@/types/api/status"
import { TypeComplaint } from "@/types/slices/complaint"
import { create } from "zustand"

interface ITypeComplaint {
    status: string
    typesComplaint: TypeComplaint[]
    totalRows: number
    selectedTypeComplaint: TypeComplaint,
    errorMessage: string | undefined
    actions: {
        onVerifying: () => Promise<void>
        onFetchTypesComplaint: (payload: TypeComplaint[]) => Promise<void>
        changeStatus: (payload: ApiStatus) => void
        onSelectedTypeComplaint: (payload: TypeComplaint) => void
        onSetTotalRows: (payload: number) => void
    }
}

const useTypeComplaint = create<ITypeComplaint>((set) => ({
    status: ApiStatus.FETCHED,
    typesComplaint: [],
    totalRows: 0,
    selectedTypeComplaint: {} as TypeComplaint,
    opened: false,
    errorMessage: undefined,
    actions: {
        onVerifying: async () => {
            set(state => ({
                status: ApiStatus.FETCHING,
                typesComplaint: state.typesComplaint,
                errorMessage: undefined
            }))
        },
        onFetchTypesComplaint: async (payload: TypeComplaint[]) => {
            set({
                status: ApiStatus.FETCHED,
                typesComplaint: payload,
                errorMessage: undefined
            })
        },
        onSelectedTypeComplaint: async (payload: TypeComplaint) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                selectedTypeComplaint: payload,
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

export const useTypeComplaintStates = () => {
    return useTypeComplaint(state => ({
        status: state.status,
        typesComplaint: state.typesComplaint,
        selectedTypeComplaint: state.selectedTypeComplaint,
        errorMessage: state.errorMessage,
        totalRows: state.totalRows
    }))
}
export const useTypeComplaintActions = () => useTypeComplaint(state => state.actions)