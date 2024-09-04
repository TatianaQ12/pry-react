import { CommiteAPI } from "@/apis/CommiteAPI"
import { CustomSnackbar } from "@/components/common/CustomSnackbar/CustomSnackbar"
import { ApiStatus } from "@/types/api/status"
import { Commitee } from "@/types/slices/commiteType"
import { TypeCommitee } from "@/types/slices/commiteType"
import { useCommiteActions, useCommiteStates } from "@/zustand/commite"
import toast from "react-hot-toast"

export const useCommiteStore = () => {
    const { types, selectedType, totalPaginationTypes, errorMessage, status, selectedCommittee, totalRowsCommittee, committees } = useCommiteStates()
    const { changeStatus, onFetchTypes, onSelectType, onSelectedCommittee, onFetchCommittee, onSetTotalRowsCommittee } = useCommiteActions()

    const getCommittees = async (payload?: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await CommiteAPI.get(payload)
            if (response?.code === 400) {
                CustomSnackbar('error', response?.data?.message || '')
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchCommittee(response?.data?.detail || [])
            onSetTotalRowsCommittee(response?.data?.total || 0)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const getTypesCommite = async (payload?: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await CommiteAPI.getTypes(payload)
            if (response?.code === 400) {
                toast.error(response?.data?.message)
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchTypes(response?.data)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const createCommittee = async (payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await CommiteAPI.create(payload)
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

    const updateCommittee = async (id: number, payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await CommiteAPI.update(id, payload)
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

    const deleteCommittee = async (id: number) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await CommiteAPI.delete(id)
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

    const setSelectType = async (typeCommitee?: TypeCommitee) => {
        onSelectType(typeCommitee)
    }

    const setSelectedCommittee = (data: Commitee) => {
        onSelectedCommittee(data)
    }

    return {
        types,
        selectedType,
        totalPaginationTypes,
        errorMessage,
        status,
        selectedCommittee,
        totalRowsCommittee,
        committees,
        getTypesCommite,
        setSelectedCommittee,
        setSelectType,
        getCommittees,
        createCommittee,
        updateCommittee,
        deleteCommittee
    }
}
