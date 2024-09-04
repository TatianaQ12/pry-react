import { ComplaintEvidenceAPI } from "@/apis/ComplaintEvidenceAPI"
import { CustomSnackbar } from "@/components/common/CustomSnackbar/CustomSnackbar"
import { ApiStatus } from "@/types/api/status"
import { ComplaintEvidence } from "@/types/slices/complaint"
import { useComplaintEvideceActions, useComplaintEvideceStates } from "@/zustand/complaintEvidence"

export const useComplaintEvidenceStore = () => {
    const { complaintEvidences, errorMessage, selectedComplaintEvidence, status, totalRows } = useComplaintEvideceStates()
    const { changeStatus, onFetchComplaintEvidences, onSelectedComplaintEvidence, onSetTotalRows } = useComplaintEvideceActions()

    const getComplaintEvidences = async (payload?: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await ComplaintEvidenceAPI.get(payload)
            if (response?.code === 400) {
                CustomSnackbar('success', response?.data?.message || '')
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchComplaintEvidences(response?.data?.detail || [])
            onSetTotalRows(response?.data?.total || 0)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const createComplaintEvidence = async (payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await ComplaintEvidenceAPI.create(payload)
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

    const updateComplaintEvidence = async (id: number, payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await ComplaintEvidenceAPI.update(id, payload)
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

    const deleteComplaintEvidence = async (id: number) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await ComplaintEvidenceAPI.delete(id)
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

    const setSelectedComplaintEvidence = (data: ComplaintEvidence) => {
        onSelectedComplaintEvidence(data)
    }

    return {
        complaintEvidences,
        errorMessage,
        selectedComplaintEvidence,
        status,
        totalRows,
        getComplaintEvidences,
        createComplaintEvidence,
        updateComplaintEvidence,
        deleteComplaintEvidence,
        setSelectedComplaintEvidence
    }
}