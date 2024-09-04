import { ApiStatus } from "@/types/api/status"
import { QuizeComplete } from "@/types/slices/quizType"
import { create } from "zustand"

interface IQuizComplete {
    status: string
    quizzesCompletes: QuizeComplete[]
    totalRows: number
    selectedQuizComplete: QuizeComplete,
    errorMessage: string | undefined
    actions: {
        onVerifying: () => Promise<void>
        onFetchQuizzesCompletes: (payload: QuizeComplete[]) => Promise<void>
        changeStatus: (payload: ApiStatus) => void
        onSelectedQuizComplete: (payload: QuizeComplete) => void
        onSetTotalRows: (payload: number) => void
    }
}

const useQuizComplete = create<IQuizComplete>((set) => ({
    status: ApiStatus.FETCHING,
    quizzesCompletes: [],
    totalRows: 0,
    selectedQuizComplete: {} as QuizeComplete,
    opened: false,
    errorMessage: undefined,
    actions: {
        onVerifying: async () => {
            set(state => ({
                status: ApiStatus.FETCHING,
                quizzesCompletes: state.quizzesCompletes,
                errorMessage: undefined
            }))
        },
        onFetchQuizzesCompletes: async (payload: QuizeComplete[]) => {
            set({
                status: ApiStatus.FETCHED,
                quizzesCompletes: payload,
                errorMessage: undefined
            })
        },
        onSelectedQuizComplete: async (payload: QuizeComplete) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                selectedQuizComplete: payload,
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

export const useQuizCompleteStates = () => {
    const { status, quizzesCompletes, selectedQuizComplete, errorMessage, totalRows } = useQuizComplete(state => ({
        status: state.status,
        quizzesCompletes: state.quizzesCompletes,
        selectedQuizComplete: state.selectedQuizComplete,
        errorMessage: state.errorMessage,
        totalRows: state.totalRows
    }))

    return {
        status,
        quizzesCompletes,
        selectedQuizComplete,
        errorMessage,
        totalRows
    }
}
export const useQuizCompleteActions = () => useQuizComplete(state => state.actions)