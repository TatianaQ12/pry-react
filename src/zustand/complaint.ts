import { ApiStatus } from "@/types/api/status"
import { Complaint } from "@/types/slices/complaint"
import { create } from "zustand"

interface IComplaint {
    status: string
    complaints: Complaint[]
    totalRows: number
    selectedComplaint: Complaint,
    errorMessage: string | undefined
    actions: {
        onVerifying: () => Promise<void>
        onFetchComplaints: (payload: Complaint[]) => Promise<void>
        changeStatus: (payload: ApiStatus) => void
        onSelectedComplaint: (payload: Complaint) => void
        onSetTotalRows: (payload: number) => void
    }
}

const useComplaint = create<IComplaint>((set) => ({
    status: ApiStatus.FETCHED,
    complaints: [],
    totalRows: 0,
    selectedComplaint: {} as Complaint,
    opened: false,
    errorMessage: undefined,
    actions: {
        onVerifying: async () => {
            set(state => ({
                status: ApiStatus.FETCHING,
                complaints: state.complaints,
                errorMessage: undefined
            }))
        },
        onFetchComplaints: async (payload: Complaint[]) => {
            set({
                status: ApiStatus.FETCHED,
                complaints: payload,
                errorMessage: undefined
            })
        },
        onSelectedComplaint: async (payload: Complaint) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                selectedComplaint: payload,
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

export const useComplaintStates = () => {
    const { status, complaints, selectedComplaint, errorMessage, totalRows } = useComplaint(state => ({
        status: state.status,
        complaints: state.complaints,
        selectedComplaint: state.selectedComplaint,
        errorMessage: state.errorMessage,
        totalRows: state.totalRows
    }))

    return {
        status,
        complaints,
        selectedComplaint,
        errorMessage,
        totalRows
    }
}
export const useComplaintActions = () => useComplaint(state => state.actions)