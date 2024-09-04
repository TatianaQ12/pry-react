import { ContractVariableAPI } from "@/apis/ContractVariableAPI"
import { CustomSnackbar } from "@/components/common/CustomSnackbar/CustomSnackbar"
import { ApiStatus } from "@/types/api/status"
import { useContractVariableActions, useContractVariableStates } from "@/zustand/contractVariable"

export const useContractVariableStore = () => {
    const { contractVariables, errorMessage, selectedContractVariable, status, totalRows } = useContractVariableStates()
    const { changeStatus, onFetchContractsVariable, onSetTotalRows } = useContractVariableActions()

    const getContractVariables = async (payload?: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await ContractVariableAPI.get(payload)
            if (response?.code === 400) {
                CustomSnackbar('error', response?.data?.message || '')
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchContractsVariable(response?.data?.detail || [])
            onSetTotalRows(response?.data?.total || 0)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    return {
        contractVariables, 
        errorMessage, 
        selectedContractVariable, 
        status, 
        totalRows,
        getContractVariables
    }
}