import { ApiStatus } from "../types/api/status"
import { toast } from "react-hot-toast"
import { useUserActions, useUserList, useUserSelect, useUserStatus } from "@/zustand/user"
import { UserAPI } from "@/apis/UserApi"
import { User } from "@/types/slices/userType"

export const useUserStore = () => {

    const users = useUserList();
    const status = useUserStatus();
    const selectedUser = useUserSelect();
    const { onFetchUsers, changeStatus, onSelectUsers } = useUserActions();

    const getUsers = async (data?:any) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await UserAPI.getUses(data)
            if (response?.code === 400) {
                toast.error(response?.data?.message)
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            const { detail } = response.data
            onFetchUsers(detail)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const createUser = async (data: any) => {
        try {
            changeStatus(ApiStatus.FETCHING)
            const response = await UserAPI.createUser(data)
            changeStatus(ApiStatus.FETCHED)
            if (!response?.status) {
                return toast.error(response.data.message)
            }
            toast.success(response.data.message)
            return true
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const editUser = async (idcompany: number, data: any) => {
        try {
            changeStatus(ApiStatus.FETCHING)
            const response = await UserAPI.editUser(idcompany, data)
            changeStatus(ApiStatus.FETCHED)
            if (!response?.status) {
                return toast.error(response.data.message)
            }
            toast.success(response.data.message)
            return true
        } catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async (iduser:number, idcompany: number) => {
        try {
            changeStatus(ApiStatus.FETCHING)
            const response = await UserAPI.deleteUser(iduser, idcompany)
            changeStatus(ApiStatus.FETCHED)
            if (!response?.status) {
                return toast.error(response.data.message)
            }
            toast.success(response.data.message)
            return true
        } catch (error) {
            console.log(error)
        }
    }

    const setSelectedUser = (user: User) => {
        try {
            onSelectUsers(user)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        //states
        users,
        status,
        selectedUser,
        //actions
        getUsers,
        createUser,
        editUser,
        deleteUser,
        setSelectedUser
    }
}