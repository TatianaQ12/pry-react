import { TaskAPI } from "@/apis/TaskAPI"
import { CustomSnackbar } from "@/components/common/CustomSnackbar/CustomSnackbar"
import { ApiStatus } from "@/types/api/status"
import { Task } from "@/types/slices/task"
import { useTaskActions, useTaskStates } from "@/zustand/task"

export const useTaskStore = () => {
    const { tasks, errorMessage, selectedTask, status, totalRows } = useTaskStates()
    const { changeStatus, onFetchTasks, onSelectedTask, onSetTotalRows } = useTaskActions()

    const getTasks = async (payload?: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await TaskAPI.get(payload)
            if (response?.code === 400) {
                CustomSnackbar('error', response?.data?.message || '')
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchTasks(response?.data?.detail || [])
            onSetTotalRows(response?.data?.total || 0)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const createTask = async (payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await TaskAPI.create(payload)
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

    const updateTask = async (id: number, payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await TaskAPI.update(id, payload)
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

    const deleteTask = async (id: number) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await TaskAPI.delete(id)
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

    const setSelectedTask = (data: Task) => {
        onSelectedTask(data)
    }

    const updateOrder = async (payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await TaskAPI.updateOrder(payload)
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

    return {
        tasks,
        errorMessage,
        selectedTask,
        status,
        totalRows,
        getTasks,
        createTask,
        updateTask,
        deleteTask,
        setSelectedTask,
        updateOrder
    }
}