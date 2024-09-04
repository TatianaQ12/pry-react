import { ApiStatus } from "@/types/api/status"
import { Quiz } from "@/types/slices/quizType"
import { create } from "zustand"

interface IQuiz {
    status: string
    quizzes: Quiz[]
    totalRows: number
    selectedQuiz: Quiz,
    errorMessage: string | undefined
    actions: {
        onVerifying: () => Promise<void>
        onFetchQuizzes: (payload: Quiz[]) => Promise<void>
        changeStatus: (payload: ApiStatus) => void
        onSelectedQuiz: (payload: Quiz) => void
        onSetTotalRows: (payload: number) => void
    }
}

const useQuiz = create<IQuiz>((set) => ({
    status: ApiStatus.FETCHING,
    quizzes: [],
    totalRows: 0,
    selectedQuiz: {} as Quiz,
    opened: false,
    errorMessage: undefined,
    actions: {
        onVerifying: async () => {
            set(state => ({
                status: ApiStatus.FETCHING,
                quizzes: state.quizzes,
                errorMessage: undefined
            }))
        },
        onFetchQuizzes: async (payload: Quiz[]) => {
            set({
                status: ApiStatus.FETCHED,
                quizzes: payload,
                errorMessage: undefined
            })
        },
        onSelectedQuiz: async (payload: Quiz) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                selectedQuiz: payload,
                errorMessage: undefined
            }))
        },
        changeStatus: async (payload: ApiStatus) => {
            set({
                status: payload
            })
        },
        onSetTotalRows: async (payload: number) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                totalRows: payload,
                errorMessage: undefined
            }))
        },
    }
}))

export const useQuizStates = () => {
    const { status, quizzes, selectedQuiz, errorMessage, totalRows } = useQuiz(state => ({
        status: state.status,
        quizzes: state.quizzes,
        selectedQuiz: state.selectedQuiz,
        errorMessage: state.errorMessage,
        totalRows: state.totalRows
    }))

    return {
        status,
        quizzes,
        selectedQuiz,
        errorMessage,
        totalRows
    }
}
export const useQuizActions = () => useQuiz(state => state.actions)