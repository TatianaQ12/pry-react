import { ApiStatus } from "@/types/api/status"
import { SignedContract } from "@/types/slices/contractType"
import { create } from "zustand"

interface ISignedContract {
    status: string
    signedsContracts: SignedContract[]
    totalRows: number
    selectedSignedContract: SignedContract,
    errorMessage: string | undefined
    actions: {
        onVerifying: () => Promise<void>
        onFetchSignedsContracts: (payload: SignedContract[]) => Promise<void>
        changeStatus: (payload: ApiStatus) => void
        onSelectedSignedContract: (payload: SignedContract) => void
        onSetTotalRows: (payload: number) => void
    }
}

const useSignedContract = create<ISignedContract>((set) => ({
    status: ApiStatus.FETCHING,
    signedsContracts: [],
    totalRows: 0,
    selectedSignedContract: {} as SignedContract,
    opened: false,
    errorMessage: undefined,
    actions: {
        onVerifying: async () => {
            set(state => ({
                status: ApiStatus.FETCHING,
                signedsContracts: state.signedsContracts,
                errorMessage: undefined
            }))
        },
        onFetchSignedsContracts: async (payload: SignedContract[]) => {
            set({
                status: ApiStatus.FETCHED,
                signedsContracts: payload,
                errorMessage: undefined
            })
        },
        onSelectedSignedContract: async (payload: SignedContract) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                selectedSignedContract: payload,
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

export const useSignedContractStates = () => {
    const { status, signedsContracts, selectedSignedContract, errorMessage, totalRows } = useSignedContract(state => ({
        status: state.status,
        signedsContracts: state.signedsContracts,
        selectedSignedContract: state.selectedSignedContract,
        errorMessage: state.errorMessage,
        totalRows: state.totalRows
    }))

    return {
        status,
        signedsContracts,
        selectedSignedContract,
        errorMessage,
        totalRows
    }
}
export const useSignedContractActions = () => useSignedContract(state => state.actions)