import { ApiStatus } from "@/types/api/status"
import { ComplaintEvidence } from "@/types/slices/complaint"
import { create } from "zustand"

interface IComplaintEvidence {
    status: string
    complaintEvidences: ComplaintEvidence[]
    totalRows: number
    selectedComplaintEvidence: ComplaintEvidence,
    errorMessage: string | undefined
    actions: {
        onVerifying: () => Promise<void>
        onFetchComplaintEvidences: (payload: ComplaintEvidence[]) => Promise<void>
        changeStatus: (payload: ApiStatus) => void
        onSelectedComplaintEvidence: (payload: ComplaintEvidence) => void
        onSetTotalRows: (payload: number) => void
    }
}

const useComplaintEvidece = create<IComplaintEvidence>((set) => ({
    status: ApiStatus.FETCHED,
    complaintEvidences: [],
    totalRows: 0,
    selectedComplaintEvidence: {} as ComplaintEvidence,
    opened: false,
    errorMessage: undefined,
    actions: {
        onVerifying: async () => {
            set(state => ({
                status: ApiStatus.FETCHING,
                complaintEvidences: state.complaintEvidences,
                errorMessage: undefined
            }))
        },
        onFetchComplaintEvidences: async (payload: ComplaintEvidence[]) => {
            set({
                status: ApiStatus.FETCHED,
                complaintEvidences: payload,
                errorMessage: undefined
            })
        },
        onSelectedComplaintEvidence: async (payload: ComplaintEvidence) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                selectedComplaintEvidence: payload,
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

export const useComplaintEvideceStates = () => {
    return useComplaintEvidece(state => ({
        status: state.status,
        complaintEvidences: state.complaintEvidences,
        selectedComplaintEvidence: state.selectedComplaintEvidence,
        errorMessage: state.errorMessage,
        totalRows: state.totalRows
    }))
}
export const useComplaintEvideceActions = () => useComplaintEvidece(state => state.actions)