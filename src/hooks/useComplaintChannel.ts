import { ComplaintChannelAPI } from "@/apis/ComplaintChannelAPI"
import { CustomSnackbar } from "@/components/common/CustomSnackbar/CustomSnackbar"
import { ApiStatus } from "@/types/api/status"
import { ComplaintChannel } from "@/types/slices/complaintChannel"
import { useComplaintChannelActions, useComplaintChannelStates } from "@/zustand/complaintChannel"

export const useComplaitChannelStore = () => {
    const { complaintChannels, errorMessage, selectedComplaintChannel, status, totalRows } = useComplaintChannelStates()
    const { changeStatus, onFetchComplaintChannels, onSelectedComplaintChannel, onSetTotalRows } = useComplaintChannelActions()

    const getComplaintChannels = async (payload?: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await ComplaintChannelAPI.get(payload)
            if (response?.code === 400) {
                CustomSnackbar('success', response?.data?.message || '')
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchComplaintChannels(response?.data?.detail || [])
            onSetTotalRows(response?.data?.total || 0)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const createComplaintChannel = async (payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await ComplaintChannelAPI.create(payload)
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

    const updateComplaintChannel = async (id: number, payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await ComplaintChannelAPI.update(id, payload)
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

    const deleteComplaintChannel = async (id: number) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await ComplaintChannelAPI.delete(id)
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

    const setSelectedComplaintChannel = (data: ComplaintChannel) => {
        onSelectedComplaintChannel(data)
    }

    return {
        complaintChannels,
        errorMessage,
        selectedComplaintChannel,
        status,
        totalRows,
        getComplaintChannels,
        createComplaintChannel,
        updateComplaintChannel,
        deleteComplaintChannel,
        setSelectedComplaintChannel
    }
}