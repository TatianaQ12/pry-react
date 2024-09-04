import { ContractAPI } from "@/apis/ContractAPI"
import { ApiStatus } from "@/types/api/status"
import { Contract } from "@/types/slices/contractType"
import { useContractActions, useContractStates } from "@/zustand/contract"
import toast from "react-hot-toast"

export const useContractStore = () => {
    const { contracts, errorMessage, selectedContract, status, totalRows } = useContractStates()
    const { changeStatus, onFetchContracts, onSelectedContract, onSetTotalRows } = useContractActions()

    const getContracts = async (payload?: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await ContractAPI.get(payload)
            if (response?.code === 400) {
                toast.error(response?.data?.message)
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchContracts(response?.data?.detail || [])
            onSetTotalRows(response?.data?.total || 0)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const createContract = async (payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await ContractAPI.create(payload)
            if (response?.code === 400) {
                toast.error(response?.data?.message || '')
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            changeStatus(ApiStatus.FETCHED)
            toast.success(response?.data?.message || '')
            return true
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const updateContract = async (id: number, payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await ContractAPI.update(id, payload)
            if (response?.code === 400) {
                toast.error(response?.data?.message || '')
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            changeStatus(ApiStatus.FETCHED)
            toast.success(response?.data?.message || '')
            return true
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const deleteContract = async (id: number) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await ContractAPI.delete(id)
            if (response?.code === 400) {
                toast.error(response?.data?.message || '')
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            changeStatus(ApiStatus.FETCHED)
            toast.success(response?.data?.message || '')
            return true
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const setSelectedContract = (data: Contract) => {
        onSelectedContract(data)
    }

    return {
        contracts,
        errorMessage,
        selectedContract,
        status,
        totalRows,
        getContracts,
        createContract,
        updateContract,
        deleteContract,
        setSelectedContract
    }
}