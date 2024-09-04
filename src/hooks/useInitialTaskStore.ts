import { InitialTaskAPI } from "@/apis/InitialTaskAPI"
import { CustomSnackbar } from "@/components/common/CustomSnackbar/CustomSnackbar"
import { ApiStatus } from "@/types/api/status"
import { InitialTask } from "@/types/slices/initialObjectiveType"
import { useInitialTaskActions, useInitialTaskStates } from "@/zustand/initialTask"

export const useInitialTaskStore = () => {
    const { initialTaks, errorMessage, selectedInitialTasks, status, totalRows } = useInitialTaskStates()
    const { changeStatus, onFetchInitialsTasks, onSelectedInitialTask, onSetTotalRows } = useInitialTaskActions()

    const getInitialTasks = async (payload?: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await InitialTaskAPI.get(payload)
            if (response?.code === 400) {
                CustomSnackbar('success', response?.data?.message || '')
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchInitialsTasks(response?.data?.detail || [])
            onSetTotalRows(response?.data?.total || 0)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const createInitialTask = async (payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await InitialTaskAPI.create(payload)
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

    const updateInitialTask = async (id: number, payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await InitialTaskAPI.update(id, payload)
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

    const deleteInitialTask = async (id: number) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await InitialTaskAPI.delete(id)
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

    const setSelectedInitialTask = (data: InitialTask) => {
        onSelectedInitialTask(data)
    }

    return {
        initialTaks,
        errorMessage,
        selectedInitialTasks,
        status,
        totalRows,
        getInitialTasks,
        createInitialTask,
        updateInitialTask,
        deleteInitialTask,
        setSelectedInitialTask
    }
}