import { ComplaintAPI } from "@/apis/ComplaintAPI"
import { CustomSnackbar } from "@/components/common/CustomSnackbar/CustomSnackbar"
import { ApiStatus } from "@/types/api/status"
import { useComplaintHistoryActions, useComplaintHistoryStates } from "@/zustand/complaintHistory"

export const useComplaintHistoryStore = () => {
    const { complaintHistories, errorMessage, status, totalRows } = useComplaintHistoryStates()
    const { changeStatus, onFetchComplaintHistories, onSetTotalRows } = useComplaintHistoryActions()

    const getComplaintHistory = async (payload?: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await ComplaintAPI.history(payload)
            if (response?.code === 400) {
                CustomSnackbar('success', response?.data?.message || '')
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchComplaintHistories(response?.data?.detail || [])
            onSetTotalRows(response?.data?.total || 0)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    return {
        complaintHistories,
        errorMessage,
        status,
        totalRows,
        getComplaintHistory
    }
}