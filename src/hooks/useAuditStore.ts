import { AuditAPI } from "@/apis/AuditAPI"
import { ApiStatus } from "@/types/api/status"
import { Audit } from "@/types/slices/auditType"
import { useAuditActions, useAuditStates } from "@/zustand/audit"
import toast from "react-hot-toast"

export const useAuditStore = () => {
    const { audits, errorMessage, selectedAudit, status } = useAuditStates()
    const { changeStatus, onFetchAudit, onSelectAudit } = useAuditActions()

    const getAudits = async (payload?: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await AuditAPI.get(payload)
            if (response?.code === 400) {
                toast.error(response?.data?.message)
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchAudit(response?.data?.detail || [])
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const createAudit = async (payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await AuditAPI.create(payload)
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

    const updateAudit = async (id: number, payload: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await AuditAPI.update(id, payload)
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

    const deleteAudit = async (id: number) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await AuditAPI.delete(id)
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

    const setSelectAudit = (audit: Audit) => {
        onSelectAudit(audit)
    }

    return {
        audits,
        errorMessage,
        selectedAudit,
        status,
        getAudits,
        createAudit,
        updateAudit,
        deleteAudit,
        setSelectAudit
    }
}