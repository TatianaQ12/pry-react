import { ApiStatus } from "@/types/api/status"
import { StructureContract } from "@/types/slices/structureContract"
import { create } from "zustand"

interface IStructureContract {
    status: string
    structuresContract: StructureContract[]
    totalRows: number
    selectedStructureContract: StructureContract,
    errorMessage: string | undefined
    actions: {
        onVerifying: () => Promise<void>
        onFetchStructuresContract: (payload: StructureContract[]) => Promise<void>
        changeStatus: (payload: ApiStatus) => void
        onSelectedStructureContract: (payload: StructureContract) => void
        onSetTotalRows: (payload: number) => void
    }
}

const useStructureContract = create<IStructureContract>((set) => ({
    status: ApiStatus.FETCHING,
    structuresContract: [],
    totalRows: 0,
    selectedStructureContract: {} as StructureContract,
    opened: false,
    errorMessage: undefined,
    actions: {
        onVerifying: async () => {
            set(state => ({
                status: ApiStatus.FETCHING,
                structuresContract: state.structuresContract,
                errorMessage: undefined
            }))
        },
        onFetchStructuresContract: async (payload: StructureContract[]) => {
            set({
                status: ApiStatus.FETCHED,
                structuresContract: payload,
                errorMessage: undefined
            })
        },
        onSelectedStructureContract: async (payload: StructureContract) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                selectedStructureContract: payload,
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

export const useStructureContractStates = () => {
    const { status, structuresContract, selectedStructureContract, errorMessage, totalRows } = useStructureContract(state => ({
        status: state.status,
        structuresContract: state.structuresContract,
        selectedStructureContract: state.selectedStructureContract,
        errorMessage: state.errorMessage,
        totalRows: state.totalRows
    }))

    return {
        status,
        structuresContract,
        selectedStructureContract,
        errorMessage,
        totalRows
    }
}
export const useStructureContractActions = () => useStructureContract(state => state.actions)