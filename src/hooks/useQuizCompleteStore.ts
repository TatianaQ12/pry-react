import { QuizCompleteAPI } from "@/apis/QuizCompleteAPI"
import { CustomSnackbar } from "@/components/common/CustomSnackbar/CustomSnackbar"
import { ApiStatus } from "@/types/api/status"
import { QuizeComplete } from "@/types/slices/quizType"
import { useQuizCompleteActions, useQuizCompleteStates } from "@/zustand/quizComplete"

export const useQuizCompleteStore = () => {
    const { quizzesCompletes, errorMessage, selectedQuizComplete, status, totalRows } = useQuizCompleteStates()
    const { changeStatus, onFetchQuizzesCompletes, onSelectedQuizComplete, onSetTotalRows } = useQuizCompleteActions()

    const getQuizzesCompletes = async (payload?: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await QuizCompleteAPI.get(payload)
            if (response?.code === 400) {
                CustomSnackbar('error', response?.data?.message || '')
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchQuizzesCompletes(response?.data?.detail || [])
            onSetTotalRows(response?.data?.total || 0)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const createQuizComplete = async (payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await QuizCompleteAPI.create(payload)
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

    const updateQuizComplete = async (id: number, payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await QuizCompleteAPI.update(id, payload)
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

    const deleteQuizComplete = async (id: number) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await QuizCompleteAPI.delete(id)
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

    const setSelectedQuizComplete = (data: QuizeComplete) => {
        onSelectedQuizComplete(data)
    }

    return {
        quizzesCompletes,
        errorMessage,
        selectedQuizComplete,
        status,
        totalRows,
        getQuizzesCompletes,
        createQuizComplete,
        updateQuizComplete,
        deleteQuizComplete,
        setSelectedQuizComplete
    }
}