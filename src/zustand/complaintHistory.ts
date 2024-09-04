import { ApiStatus } from "@/types/api/status"
import { ComplaintHistory } from "@/types/slices/complaint"
import { create } from "zustand"

interface IComplaintHistory {
    status: string
    complaintHistories: ComplaintHistory[]
    totalRows: number
    errorMessage: string | undefined
    actions: {
        onVerifying: () => Promise<void>
        onFetchComplaintHistories: (payload: ComplaintHistory[]) => Promise<void>
        changeStatus: (payload: ApiStatus) => void
        onSetTotalRows: (payload: number) => void
    }
}

const useComplaintHistory = create<IComplaintHistory>((set) => ({
    status: ApiStatus.FETCHED,
    complaintHistories: [],
    totalRows: 0,
    opened: false,
    errorMessage: undefined,
    actions: {
        onVerifying: async () => {
            set(state => ({
                status: ApiStatus.FETCHING,
                complaintHistories: state.complaintHistories,
                errorMessage: undefined
            }))
        },
        onFetchComplaintHistories: async (payload: ComplaintHistory[]) => {
            set({
                status: ApiStatus.FETCHED,
                complaintHistories: payload,
                errorMessage: undefined
            })
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

export const useComplaintHistoryStates = () => {
    return useComplaintHistory(state => ({
        status: state.status,
        complaintHistories: state.complaintHistories,
        errorMessage: state.errorMessage,
        totalRows: state.totalRows
    }))
}

export const useComplaintHistoryActions = () => {
    return useComplaintHistory(state => state.actions)
}