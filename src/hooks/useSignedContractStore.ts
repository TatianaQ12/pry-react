import { SignedContractAPI } from "@/apis/SignedContractAPI"
import { CustomSnackbar } from "@/components/common/CustomSnackbar/CustomSnackbar"
import { ApiStatus } from "@/types/api/status"
import { SignedContract } from "@/types/slices/contractType"
import { useSignedContractActions, useSignedContractStates } from "@/zustand/signedContract"

export const useSignedContractStore = () => {
    const { signedsContracts, errorMessage, selectedSignedContract, status, totalRows } = useSignedContractStates()
    const { changeStatus, onFetchSignedsContracts, onSelectedSignedContract, onSetTotalRows } = useSignedContractActions()

    const getSignedsContracts = async (payload?: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await SignedContractAPI.get(payload)
            if (response?.code === 400) {
                CustomSnackbar('error', response?.data?.message || '')
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchSignedsContracts(response?.data?.detail || [])
            onSetTotalRows(response?.data?.total || 0)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const createSignedContract = async (payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await SignedContractAPI.create(payload)
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

    const updateSignedContract = async (id: number, payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await SignedContractAPI.update(id, payload)
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

    const deleteSignedContract = async (id: number) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await SignedContractAPI.delete(id)
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

    const setSelectedSignedContract = (data: SignedContract) => {
        onSelectedSignedContract(data)
    }

    return {
        signedsContracts,
        errorMessage,
        selectedSignedContract,
        status,
        totalRows,
        getSignedsContracts,
        createSignedContract,
        updateSignedContract,
        deleteSignedContract,
        setSelectedSignedContract
    }
}