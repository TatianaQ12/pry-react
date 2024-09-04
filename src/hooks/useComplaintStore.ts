import { ComplaintAPI } from "@/apis/ComplaintAPI"
import { CustomSnackbar } from "@/components/common/CustomSnackbar/CustomSnackbar"
import { ApiStatus } from "@/types/api/status"
import { Complaint } from "@/types/slices/complaint"
import { useComplaintActions, useComplaintStates } from "@/zustand/complaint"

export const useComplaintStore = () => {
    const { complaints, selectedComplaint, status, totalRows } = useComplaintStates()
    const { changeStatus, onFetchComplaints, onSelectedComplaint, onSetTotalRows } = useComplaintActions()

    const getComplaints = async (payload?: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await ComplaintAPI.get(payload)
            if (response?.code === 400) {
                CustomSnackbar('success', response?.data?.message || '')
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchComplaints(response?.data?.detail || [])
            onSetTotalRows(response?.data?.total || 0)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const createComplaint = async (payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await ComplaintAPI.create(payload)
            if (response?.code === 400) {
                CustomSnackbar('error', response?.data?.message || '')
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            changeStatus(ApiStatus.FETCHED)
            CustomSnackbar('success', response?.data?.message || '')
            return response?.data?.detail
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const updateComplaint = async (id: number, payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await ComplaintAPI.update(id, payload)
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

    const deleteComplaint = async (id: number) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await ComplaintAPI.delete(id)
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

    const setSelectedComplaint = (data: Complaint) => {
        onSelectedComplaint(data)
    }


    return {
        complaints,
        selectedComplaint,
        status,
        totalRows,
        getComplaints,
        createComplaint,
        updateComplaint,
        deleteComplaint,
        setSelectedComplaint
    }
}