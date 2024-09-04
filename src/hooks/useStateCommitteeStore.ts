import { StateCommitteeAPI } from "@/apis/StateCommitteeAPI"
import { CustomSnackbar } from "@/components/common/CustomSnackbar/CustomSnackbar"
import { ApiStatus } from "@/types/api/status"
import { StateCommittee } from "@/types/slices/stateCommittee"
import { useStateCommitteeActions, useStateCommitteeStates } from "@/zustand/stateCommittee"

export const useStateCommitteeStore = () => {
    const { statesCommittee, errorMessage, selectedStateCommittee, status, totalRows } = useStateCommitteeStates()
    const { changeStatus, onFetchStatesCommittee, onSelectedStateCommittee, onSetTotalRows } = useStateCommitteeActions()

    const getStatesCommittees = async (payload?: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await StateCommitteeAPI.get(payload)
            if (response?.code === 400) {
                CustomSnackbar('error', response?.data?.message || '')
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchStatesCommittee(response?.data?.detail || [])
            onSetTotalRows(response?.data?.total || 0)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const createStateCommittee = async (payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await StateCommitteeAPI.create(payload)
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

    const updateStateCommittee = async (id: number, payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await StateCommitteeAPI.update(id, payload)
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

    const deleteStateCommittee = async (id: number) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await StateCommitteeAPI.delete(id)
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

    const setSelectedStateCommittee = (data: StateCommittee) => {
        onSelectedStateCommittee(data)
    }

    return {
        statesCommittee,
        errorMessage,
        selectedStateCommittee,
        status,
        totalRows,
        getStatesCommittees,
        createStateCommittee,
        updateStateCommittee,
        deleteStateCommittee,
        setSelectedStateCommittee
    }
}