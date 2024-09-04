import { ApiStatus } from "@/types/api/status"
import { RRHH } from "@/types/slices/rrhhType"
import { create } from "zustand"

interface IRRHH {
    status: string
    rrhhs: RRHH[]
    selectedRRHH: RRHH,
    errorMessage: string | undefined
    actions: {
        onVerifying: () => Promise<void>
        onFetchRRHHs: (rule: RRHH[]) => Promise<void>
        changeStatus: (payload: ApiStatus) => void
        onSelectRRHH: (payload: RRHH) => void
    }
}

const useRRHH = create<IRRHH>((set) => ({
    status: ApiStatus.FETCHED,
    rrhhs: [],
    selectedRRHH: {} as RRHH,
    opened: false,
    errorMessage: undefined,
    actions: {
        onVerifying: async () => {
            set(state => ({
                status: ApiStatus.FETCHING,
                rrhhs: state.rrhhs,
                errorMessage: undefined
            }))
        },
        onFetchRRHHs: async (payload: RRHH[]) => {
            set({
                status: ApiStatus.FETCHED,
                rrhhs: payload,
                errorMessage: undefined
            })
        },
        onSelectRRHH: async (payload: RRHH) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                selectedRRHH: payload,
                errorMessage: undefined
            }))
        },
        changeStatus: async (payload: ApiStatus) => {
            set({
                status: payload
            })
        },
    }

}))

export const useRRHHStates = () => {
    const { status, rrhhs, selectedRRHH, errorMessage } = useRRHH(state => ({
        status: state.status,
        rrhhs: state.rrhhs,
        selectedRRHH: state.selectedRRHH,
        errorMessage: state.errorMessage
    }))

    return {
        status,
        rrhhs,
        selectedRRHH,
        errorMessage
    }
}
export const useRRHHActions = () => useRRHH(state => state.actions)