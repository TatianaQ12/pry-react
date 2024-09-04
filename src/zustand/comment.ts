import { ApiStatus } from "@/types/api/status"
import { Comment } from "@/types/slices/commentType"
import { create } from "zustand"

interface IComment {
    status: string
    comments: Comment[]
    totalRows: number
    selectedComment: Comment,
    errorMessage: string | undefined
    actions: {
        onVerifying: () => Promise<void>
        onFetchComments: (payload: Comment[]) => Promise<void>
        changeStatus: (payload: ApiStatus) => void
        onSelectedComment: (payload: Comment) => void
        onSetTotalRows: (payload: number) => void
    }
}

const useComment = create<IComment>((set) => ({
    status: ApiStatus.FETCHED,
    comments: [],
    totalRows: 0,
    selectedComment: {} as Comment,
    opened: false,
    errorMessage: undefined,
    actions: {
        onVerifying: async () => {
            set(state => ({
                status: ApiStatus.FETCHING,
                comments: state.comments,
                errorMessage: undefined
            }))
        },
        onFetchComments: async (payload: Comment[]) => {
            set({
                status: ApiStatus.FETCHED,
                comments: payload,
                errorMessage: undefined
            })
        },
        onSelectedComment: async (payload: Comment) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                selectedComment: payload,
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

export const useCommentStates = () => {
    const { status, comments, selectedComment, errorMessage, totalRows } = useComment(state => ({
        status: state.status,
        comments: state.comments,
        selectedComment: state.selectedComment,
        errorMessage: state.errorMessage,
        totalRows: state.totalRows
    }))

    return {
        status,
        comments,
        selectedComment,
        errorMessage,
        totalRows
    }
}
export const useCommentActions = () => useComment(state => state.actions)