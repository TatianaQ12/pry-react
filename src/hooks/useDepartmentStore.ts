import { DepartmentAPI } from "@/apis/DepartmentAPI"
import { ApiStatus } from "@/types/api/status"
import { useDepartmentActions, useDepartmentStates } from "@/zustand/department"
import toast from "react-hot-toast"

export const useDepartmentStore = () => {
    const { departments, errorMessage, status } = useDepartmentStates()
    const { changeStatus, onFetchDepartments } = useDepartmentActions()

    const getDepartments = async (payload?: object) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await DepartmentAPI.get(payload)
            if (response?.code === 400) {
                toast.error(response?.data?.message)
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchDepartments(response?.data?.detail || [])
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    return {
        departments,
        errorMessage,
        status,
        getDepartments
    }
}