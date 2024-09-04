import { StructureContractAPI } from "@/apis/StructureContractAPI"
import { CustomSnackbar } from "@/components/common/CustomSnackbar/CustomSnackbar"
import { ApiStatus } from "@/types/api/status"
import { StructureContract } from "@/types/slices/structureContract"
import { useStructureContractActions, useStructureContractStates } from "@/zustand/structureContract"

export const useStructureContractStore = () => {
    const { structuresContract, errorMessage, selectedStructureContract, status, totalRows } = useStructureContractStates()
    const { changeStatus, onFetchStructuresContract, onSelectedStructureContract, onSetTotalRows } = useStructureContractActions()

    const getStructuresContracts = async (payload?: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await StructureContractAPI.get(payload)
            if (response?.code === 400) {
                CustomSnackbar('error', response?.data?.message || '')
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchStructuresContract(response?.data?.detail || [])
            onSetTotalRows(response?.data?.total || 0)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const createStructureContract = async (payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await StructureContractAPI.create(payload)
            if (response?.code === 400) {
                CustomSnackbar('error', response?.data?.message || '')
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            changeStatus(ApiStatus.FETCHED)
            CustomSnackbar('success', response?.data?.message || '')
            return true
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const updateStructureContract = async (id: number, payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await StructureContractAPI.update(id, payload)
            if (response?.code === 400) {
                CustomSnackbar('error', response?.data?.message || '')
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            changeStatus(ApiStatus.FETCHED)
            CustomSnackbar('success', response?.data?.message || '')
            return true
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const deleteStructureContract = async (id: number) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await StructureContractAPI.delete(id)
            if (response?.code === 400) {
                CustomSnackbar('error', response?.data?.message || '')
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            changeStatus(ApiStatus.FETCHED)
            CustomSnackbar('success', response?.data?.message || '')
            return true
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const setSelectedStructureContract = (data: StructureContract) => {
        onSelectedStructureContract(data)
    }

    return {
        structuresContract,
        errorMessage,
        selectedStructureContract,
        status,
        totalRows,
        getStructuresContracts,
        createStructureContract,
        updateStructureContract,
        deleteStructureContract,
        setSelectedStructureContract
    }
}