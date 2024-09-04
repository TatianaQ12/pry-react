import { ApiStatus } from "@/types/api/status"
import { ContractVariable } from "@/types/slices/contractVariable"
import { create } from "zustand"

interface IContractVariable {
    status: string
    contractVariables: ContractVariable[]
    totalRows: number
    selectedContractVariable: ContractVariable,
    errorMessage: string | undefined
    actions: {
        onVerifying: () => Promise<void>
        onFetchContractsVariable: (payload: ContractVariable[]) => Promise<void>
        changeStatus: (payload: ApiStatus) => void
        onSelectedContractVariable: (payload: ContractVariable) => void
        onSetTotalRows: (payload: number) => void
    }
}

const useContractvariable = create<IContractVariable>((set) => ({
    status: ApiStatus.FETCHING,
    contractVariables: [],
    totalRows: 0,
    selectedContractVariable: {} as ContractVariable,
    opened: false,
    errorMessage: undefined,
    actions: {
        onVerifying: async () => {
            set(state => ({
                status: ApiStatus.FETCHING,
                contractVariables: state.contractVariables,
                errorMessage: undefined
            }))
        },
        onFetchContractsVariable: async (payload: ContractVariable[]) => {
            set({
                status: ApiStatus.FETCHED,
                contractVariables: payload,
                errorMessage: undefined
            })
        },
        onSelectedContractVariable: async (payload: ContractVariable) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                selectedContractVariable: payload,
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

export const useContractVariableStates = () => {
    const { status, contractVariables, selectedContractVariable, errorMessage, totalRows } = useContractvariable(state => ({
        status: state.status,
        contractVariables: state.contractVariables,
        selectedContractVariable: state.selectedContractVariable,
        errorMessage: state.errorMessage,
        totalRows: state.totalRows
    }))

    return {
        status,
        contractVariables,
        selectedContractVariable,
        errorMessage,
        totalRows
    }
}
export const useContractVariableActions = () => useContractvariable(state => state.actions)