import { TaskDocumentAPI } from "@/apis/TaskDocumentAPI"
import { CustomSnackbar } from "@/components/common/CustomSnackbar/CustomSnackbar"
import { ApiStatus } from "@/types/api/status"
import { TaskDocument } from "@/types/slices/taskDocumentType"
import { useTaskDocumentActions, useTaskDocumentStates } from "@/zustand/taskDocument"

export const useTaskDocumentStore = () => {
    const { taskDocuments, errorMessage, selectedTaskDocument, status, totalRows } = useTaskDocumentStates()
    const { changeStatus, onFetchTaskDocuments, onSelectedTaskDocument, onSetTotalRows } = useTaskDocumentActions()

    const getTaskDocuments = async (payload?: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await TaskDocumentAPI.get(payload)
            if (response?.code === 400) {
                CustomSnackbar('error', response?.data?.message || '')
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchTaskDocuments(response?.data?.detail || [])
            onSetTotalRows(response?.data?.total || 0)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const createTaskDocument = async (payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await TaskDocumentAPI.create(payload)
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

    const updateTaskDocument = async (id: number, payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await TaskDocumentAPI.update(id, payload)
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

    const deleteTaskDocument = async (id: number) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await TaskDocumentAPI.delete(id)
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

    const setSelectedTaskDocument = (data: TaskDocument) => {
        onSelectedTaskDocument(data)
    }

    return {
        taskDocuments,
        errorMessage,
        selectedTaskDocument,
        status,
        totalRows,
        getTaskDocuments,
        createTaskDocument,
        updateTaskDocument,
        deleteTaskDocument,
        setSelectedTaskDocument
    }
}