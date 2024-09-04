import { QuizAPI } from "@/apis/QuizAPI"
import { CustomSnackbar } from "@/components/common/CustomSnackbar/CustomSnackbar"
import { ApiStatus } from "@/types/api/status"
import { Quiz } from "@/types/slices/quizType"
import { useQuizActions, useQuizStates } from "@/zustand/quiz"

export const useQuizStore = () => {
    const { quizzes, errorMessage, selectedQuiz, status, totalRows } = useQuizStates()
    const { changeStatus, onFetchQuizzes, onSelectedQuiz, onSetTotalRows } = useQuizActions()

    const getQuizzes = async (payload?: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await QuizAPI.get(payload)
            if (response?.code === 400) {
                CustomSnackbar('error', response?.data?.message || '')
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchQuizzes(response?.data?.detail || [])
            onSetTotalRows(response?.data?.total || 0)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const createQuiz = async (payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await QuizAPI.create(payload)
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

    const updateQuiz = async (id: number, payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await QuizAPI.update(id, payload)
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

    const deleteQuiz = async (id: number) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await QuizAPI.delete(id)
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

    const setSelectedQuiz = (data: Quiz) => {
        onSelectedQuiz(data)
    }

    return {
        quizzes,
        errorMessage,
        selectedQuiz,
        status,
        totalRows,
        getQuizzes,
        createQuiz,
        updateQuiz,
        deleteQuiz,
        setSelectedQuiz
    }
}