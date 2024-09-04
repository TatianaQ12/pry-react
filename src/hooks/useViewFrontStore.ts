import { ViewAPI } from "@/apis/ViewAPI"
import { ApiStatus } from "@/types/api/status"
import { ViewFront } from "@/types/slices/ruleType"
import { useViewFrontActions, useViewFrontStates } from "@/zustand/view"
import toast from "react-hot-toast"

export const useViewFrontStore = () => {
    const { views, errorMessage, selectedView, status, totalRows, typesView } = useViewFrontStates()
    const { changeStatus, onFetchViews, onSelectedView, onSetTotalRows, onFetchTypesView } = useViewFrontActions()

    const getViewsFront = async (payload?: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await ViewAPI.get(payload)
            if (response?.code === 400) {
                toast.error(response?.data?.message)
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchViews(response?.data?.detail || [])
            onSetTotalRows(response?.data?.total || 0)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const createViewFront = async (payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await ViewAPI.create(payload)
            if (response?.code === 400) {
                toast.error(response?.data?.message || '')
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            changeStatus(ApiStatus.FETCHED)
            toast.success(response?.data?.message || '')
            return true
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const setSelectedViewFront = (data: ViewFront) => {
        onSelectedView(data)
    }

    const getTypesView = async (payload?: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await ViewAPI.getTypes(payload)
            if (response?.code === 400) {
                toast.error(response?.data?.message)
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchTypesView(response?.data?.detail || [])
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }
    
    return {
        views, 
        errorMessage, 
        selectedView, 
        status,
        totalRows,
        typesView,
        getViewsFront,
        createViewFront,
        setSelectedViewFront,
        getTypesView
    }
}