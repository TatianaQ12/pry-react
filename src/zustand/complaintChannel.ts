import { ApiStatus } from "@/types/api/status"
import { ComplaintChannel } from "@/types/slices/complaintChannel"
import { create } from "zustand"

interface IComplaintChannel {
    status: string
    complaintChannels: ComplaintChannel[]
    totalRows: number
    selectedComplaintChannel: ComplaintChannel,
    errorMessage: string | undefined
    actions: {
        onVerifying: () => Promise<void>
        onFetchComplaintChannels: (payload: ComplaintChannel[]) => Promise<void>
        changeStatus: (payload: ApiStatus) => void
        onSelectedComplaintChannel: (payload: ComplaintChannel) => void
        onSetTotalRows: (payload: number) => void
    }
}

const useComplaintChannel = create<IComplaintChannel>((set) => ({
    status: ApiStatus.FETCHED,
    complaintChannels: [],
    totalRows: 0,
    selectedComplaintChannel: {} as ComplaintChannel,
    opened: false,
    errorMessage: undefined,
    actions: {
        onVerifying: async () => {
            set(state => ({
                status: ApiStatus.FETCHING,
                complaintChannels: state.complaintChannels,
                errorMessage: undefined
            }))
        },
        onFetchComplaintChannels: async (payload: ComplaintChannel[]) => {
            set({
                status: ApiStatus.FETCHED,
                complaintChannels: payload,
                errorMessage: undefined
            })
        },
        onSelectedComplaintChannel: async (payload: ComplaintChannel) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                selectedComplaintChannel: payload,
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

export const useComplaintChannelStates = () => {
    const { status, complaintChannels, selectedComplaintChannel, errorMessage, totalRows } = useComplaintChannel(state => ({
        status: state.status,
        complaintChannels: state.complaintChannels,
        selectedComplaintChannel: state.selectedComplaintChannel,
        errorMessage: state.errorMessage,
        totalRows: state.totalRows
    }))

    return {
        status,
        complaintChannels,
        selectedComplaintChannel,
        errorMessage,
        totalRows
    }
}
export const useComplaintChannelActions = () => useComplaintChannel(state => state.actions)