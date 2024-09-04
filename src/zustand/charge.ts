import { ApiStatus } from "@/types/api/status"
import { Charge } from "@/types/slices/chargeType"
import { create } from 'zustand'

interface ICharge {
    status: string
    charges: Charge[]
    selectedCharge: Charge,
    errorMessage: string | undefined
    actions: {
        onVerifying: () => Promise<void>
        onFetchCharges: (rule: Charge[]) => Promise<void>
        changeStatus: (payload: ApiStatus) => void
        onSelectCharge: (payload: Charge) => void
    }
}

const useCharge = create<ICharge>((set) => ({
    status: ApiStatus.FETCHING,
    charges: [],
    selectedCharge: {} as Charge,
    opened: false,
    errorMessage: undefined,
    actions: {
        onVerifying: async () => {
            set(state => ({
                status: ApiStatus.FETCHING,
                charges: state.charges,
                errorMessage: undefined
            }))
        },
        onFetchCharges: async (payload: Charge[]) => {
            set({
                status: ApiStatus.FETCHED,
                charges: payload,
                errorMessage: undefined
            })
        },
        onSelectCharge: async (payload: Charge) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                selectedCharge: payload,
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

export const useChargeStates = () => {
    const { status, charges, selectedCharge, errorMessage } = useCharge(state => ({
        status: state.status,
        charges: state.charges,
        selectedCharge: state.selectedCharge,
        errorMessage: state.errorMessage
    }))

    return {
        status,
        charges,
        selectedCharge,
        errorMessage
    }
}
export const useChargeActions = () => useCharge(state => state.actions)