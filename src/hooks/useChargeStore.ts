import { ChargeAPI } from "@/apis/ChargeAPI"
import { ApiStatus } from "@/types/api/status"
import { Charge } from "@/types/slices/chargeType"
import { useChargeActions, useChargeStates } from "@/zustand/charge"
import toast from 'react-hot-toast'

export const useChargeStore = () => {

    const { charges, errorMessage, selectedCharge, status } = useChargeStates()
    const { changeStatus, onFetchCharges, onSelectCharge } = useChargeActions()

    const getCharges = async (payload?: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await ChargeAPI.get(payload)
            if (response?.code === 400) {
                toast.error(response?.data?.message)
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchCharges(response?.data?.detail)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const createCharge = async (payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await ChargeAPI.create(payload)
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

    const updateCharge = async (id: number, payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await ChargeAPI.update(id, payload)
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

    const deleteCharge = async (id: number) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await ChargeAPI.delete(id)
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


    const setSelecCharge = (charge: Charge) => {
        onSelectCharge(charge)
    }

    return {
        charges,
        errorMessage,
        selectedCharge,
        status,
        getCharges,
        createCharge,
        updateCharge,
        deleteCharge,
        setSelecCharge
    }
}