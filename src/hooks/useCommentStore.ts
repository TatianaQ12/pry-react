import { CommentAPI } from "@/apis/CommentAPI"
import { CustomSnackbar } from "@/components/common/CustomSnackbar/CustomSnackbar"
import { ApiStatus } from "@/types/api/status"
import { Comment } from "@/types/slices/commentType"
import { useCommentActions, useCommentStates } from "@/zustand/comment"

export const useCommentStore = () => {
    const { comments, errorMessage, selectedComment, status, totalRows } = useCommentStates()
    const { changeStatus, onFetchComments, onSelectedComment, onSetTotalRows } = useCommentActions()

    const getComments = async (payload?: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await CommentAPI.get(payload)
            if (response?.code === 400) {
                CustomSnackbar('error', response?.data?.message || '')
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchComments(response?.data?.detail || [])
            onSetTotalRows(response?.data?.total || 0)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const createComment = async (payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await CommentAPI.create(payload)
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

    const updateComment = async (id: number, payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await CommentAPI.update(id, payload)
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

    const deleteComment = async (id: number) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await CommentAPI.delete(id)
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

    const setSelectedComment = (data: Comment) => {
        onSelectedComment(data)
    }

    return {
        comments,
        errorMessage,
        selectedComment,
        status,
        totalRows,
        getComments,
        createComment,
        updateComment,
        deleteComment,
        setSelectedComment
    }
}