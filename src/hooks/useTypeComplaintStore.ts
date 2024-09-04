import { TypeComplaintAPI } from "@/apis/TypeComplaintAPI"
import { CustomSnackbar } from "@/components/common/CustomSnackbar/CustomSnackbar"
import { ApiStatus } from "@/types/api/status"
import { TypeComplaint } from "@/types/slices/complaint"
import { useTypeComplaintActions, useTypeComplaintStates } from "@/zustand/typeComplaint"

export const useTypeComplaintStore = () => {
    const { typesComplaint, errorMessage, selectedTypeComplaint, status, totalRows } = useTypeComplaintStates()
    const { changeStatus, onFetchTypesComplaint, onSelectedTypeComplaint, onSetTotalRows } = useTypeComplaintActions()

    const getTypesComplaint = async (payload?: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await TypeComplaintAPI.get(payload)
            if (response?.code === 400) {
                CustomSnackbar('success', response?.data?.message || '')
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchTypesComplaint(response?.data?.detail || [])
            onSetTotalRows(response?.data?.total || 0)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const createTypeComplaint = async (payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await TypeComplaintAPI.create(payload)
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

    const updateTypeComplaint = async (id: number, payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await TypeComplaintAPI.update(id, payload)
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

    const deleteTypeComplaint = async (id: number) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await TypeComplaintAPI.delete(id)
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


    const setSelectedTypeComplaint = (data: TypeComplaint) => {
        onSelectedTypeComplaint(data)
    }

    return {
        typesComplaint,
        errorMessage,
        selectedTypeComplaint,
        status,
        totalRows,
        getTypesComplaint,
        createTypeComplaint,
        updateTypeComplaint,
        deleteTypeComplaint,
        setSelectedTypeComplaint
    }
}