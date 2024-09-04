import { InitialObjectiveAPI } from "@/apis/InitialObjectiveAPI"
import { CustomSnackbar } from "@/components/common/CustomSnackbar/CustomSnackbar"
import { ApiStatus } from "@/types/api/status"
import { InitialObjective } from "@/types/slices/initialObjectiveType"
import { useInitialObjectiveActions, useInitialObjectiveStates } from "@/zustand/initialObjective"

export const useInitialObjectiveStore = () => {
    const { initialObjectives, errorMessage, selectedInitialObjective, status, totalRows } = useInitialObjectiveStates()
    const { changeStatus, onFetchInitialsObjective, onSelectedInitialObjective, onSetTotalRows } = useInitialObjectiveActions()

    const getInitialObjectives = async (payload?: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await InitialObjectiveAPI.get(payload)
            if (response?.code === 400) {
                CustomSnackbar('success', response?.data?.message || '')
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchInitialsObjective(response?.data?.detail || [])
            onSetTotalRows(response?.data?.total || 0)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const createInitialObjective = async (payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await InitialObjectiveAPI.create(payload)
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

    const updateInitialObjective = async (id: number, payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await InitialObjectiveAPI.update(id, payload)
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

    const deleteInitialObjective = async (id: number) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await InitialObjectiveAPI.delete(id)
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

    const setSelectedInitialObjective = (data: InitialObjective) => {
        onSelectedInitialObjective(data)
    }

    return {
        initialObjectives, 
        errorMessage, 
        selectedInitialObjective, 
        status, 
        totalRows,
        getInitialObjectives,
        createInitialObjective,
        updateInitialObjective,
        deleteInitialObjective,
        setSelectedInitialObjective
    }
}