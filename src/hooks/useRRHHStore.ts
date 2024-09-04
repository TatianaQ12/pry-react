import { RRHHAPI } from "@/apis/RRHHAPI"
import { ApiStatus } from "@/types/api/status"
import { RRHH } from "@/types/slices/rrhhType"
import { useRRHHActions, useRRHHStates } from "@/zustand/rrhh"
import toast from "react-hot-toast"

export const useRRHHStore = () => {
    const { rrhhs, errorMessage, selectedRRHH, status } = useRRHHStates()
    const { changeStatus, onFetchRRHHs, onSelectRRHH } = useRRHHActions()

    const getRRHHs = async (payload?: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await RRHHAPI.get(payload)
            if (response?.code === 400) {
                toast.error(response?.data?.message)
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchRRHHs(response?.data?.detail || [])
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const createRRHH = async (payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await RRHHAPI.create(payload)
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

    const updateRRHH = async (id: number, payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await RRHHAPI.update(id, payload)
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

    const deleteRRHH = async (id: number) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await RRHHAPI.delete(id)
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

    const setSelectRRHH = (rrhh: RRHH) => {
        onSelectRRHH(rrhh)
    }

    return {
        rrhhs,
        errorMessage,
        selectedRRHH,
        status,
        getRRHHs,
        createRRHH,
        updateRRHH,
        deleteRRHH,
        setSelectRRHH
    }
}