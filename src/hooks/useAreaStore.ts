import { AreaAPI } from "@/apis/AreaAPI"
import { CustomSnackbar } from "@/components/common/CustomSnackbar/CustomSnackbar"
import { ApiStatus } from "@/types/api/status"
import { Area } from "@/types/slices/areaType"
import { useAreaActions, useAreaStates } from "@/zustand/area"

export const useAreaStore = () => {
    const { areas, errorMessage, selectedArea, status, totalRows } = useAreaStates()
    const { changeStatus, onFetchAreas, onSelectedArea, onSetTotalRows } = useAreaActions()

    const getAreas = async (payload?: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await AreaAPI.get(payload)
            if (response?.code === 400) {
                CustomSnackbar('success', response?.data?.message || '')
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchAreas(response?.data?.detail || [])
            onSetTotalRows(response?.data?.total || 0)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const createArea = async (payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await AreaAPI.create(payload)
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

    const updateArea = async (id: number, payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await AreaAPI.update(id, payload)
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

    const deleteArea = async (id: number) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await AreaAPI.delete(id)
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

    const setSelectedArea = (data: Area) => {
        onSelectedArea(data)
    }

    return {
        areas,
        errorMessage,
        selectedArea,
        status,
        totalRows,
        getAreas,
        createArea,
        updateArea,
        deleteArea,
        setSelectedArea
    }
}