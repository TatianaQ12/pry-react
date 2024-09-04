import { ApiStatus } from "@/types/api/status"
import { Contract } from "@/types/slices/contractType"
import { create } from "zustand"

interface IContract {
    status: string
    contracts: Contract[]
    totalRows: number
    selectedContract: Contract,
    errorMessage: string | undefined
    actions: {
        onVerifying: () => Promise<void>
        onFetchContracts: (rule: Contract[]) => Promise<void>
        changeStatus: (payload: ApiStatus) => void
        onSelectedContract: (payload: Contract) => void
        onSetTotalRows: (payload: number) => void
    }
}

const useContract = create<IContract>((set) => ({
    status: ApiStatus.FETCHING,
    contracts: [],
    totalRows: 0,
    selectedContract: {} as Contract,
    opened: false,
    errorMessage: undefined,
    actions: {
        onVerifying: async () => {
            set(state => ({
                status: ApiStatus.FETCHING,
                contracts: state.contracts,
                errorMessage: undefined
            }))
        },
        onFetchContracts: async (payload: Contract[]) => {
            set({
                status: ApiStatus.FETCHED,
                contracts: payload,
                errorMessage: undefined
            })
        },
        onSelectedContract: async (payload: Contract) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                selectedContract: payload,
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

export const useContractStates = () => {
    const { status, contracts, selectedContract, errorMessage, totalRows } = useContract(state => ({
        status: state.status,
        contracts: state.contracts,
        selectedContract: state.selectedContract,
        errorMessage: state.errorMessage,
        totalRows: state.totalRows
    }))

    return {
        status,
        contracts,
        selectedContract,
        errorMessage,
        totalRows
    }
}
export const useContractActions = () => useContract(state => state.actions)