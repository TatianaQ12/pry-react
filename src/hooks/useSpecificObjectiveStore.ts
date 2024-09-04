import { SpecificObjectiveAPI } from "@/apis/SpecificObjectiveAPI"
import { CustomSnackbar } from "@/components/common/CustomSnackbar/CustomSnackbar"
import { ApiStatus } from "@/types/api/status"
import { SpecificObjective } from "@/types/slices/specificObjective"
import { useSpecificObjectiveActions, useSpecificObjectiveStates } from "@/zustand/specificObjective"

export const useSpecificObjectiveStore = () => {
    const { specificsObjectives, errorMessage, selectedSpecificObjective, status, totalRows } = useSpecificObjectiveStates()
    const { changeStatus, onFetchSpecificObjective, onSelectedSpecificObjective, onSetTotalRows } = useSpecificObjectiveActions()

    const getSpecificObjectives = async (payload?: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await SpecificObjectiveAPI.get(payload)
            if (response?.code === 400) {
                CustomSnackbar('error', response?.data?.message || '')
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchSpecificObjective(response?.data?.detail || [])
            onSetTotalRows(response?.data?.total || 0)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const createSpecificObjective = async (payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await SpecificObjectiveAPI.create(payload)
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

    const updateSpecificObjectives = async (id: number, payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await SpecificObjectiveAPI.update(id, payload)
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

    const deleteSpecificObjectives = async (id: number) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await SpecificObjectiveAPI.delete(id)
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

    const setSelectedSpecificObjectives = (data: SpecificObjective) => {
        onSelectedSpecificObjective(data)
    }

    return {
        specificsObjectives,
        errorMessage,
        selectedSpecificObjective,
        status,
        totalRows,
        getSpecificObjectives,
        createSpecificObjective,
        updateSpecificObjectives,
        deleteSpecificObjectives,
        setSelectedSpecificObjectives
    }
}