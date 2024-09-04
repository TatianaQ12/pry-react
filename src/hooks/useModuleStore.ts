import { ModuleAPI } from "@/apis/ModuleAPI";
import { ApiStatus } from "@/types/api/status";
import { Module } from "@/types/slices/moduleType";
import { useModuleActions, useModuleList, useModuleSelectModule, useModuleStatus } from "@/zustand/module";
import toast from 'react-hot-toast'

export const useModuleStore = () => {

    const modules = useModuleList();
    const status = useModuleStatus();
    const selectedModule = useModuleSelectModule();
    const { onFetchModules, changeStatus, onSelectModule } = useModuleActions();

    const getModule = async () => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await ModuleAPI.get()
            if (response?.code === 400) {
                toast.error(response?.data?.message)
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchModules(response?.data?.detail)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const createModule = async (data: any) => {
        try {
            changeStatus(ApiStatus.FETCHING)
            const response = await ModuleAPI.createModule(data)
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

    const editModule = async (idmodule: number, data: any) => {
        try {
            changeStatus(ApiStatus.FETCHING)
            const response = await ModuleAPI.editModule(idmodule, data)
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

    const setSelectModule = (module: Module) => {
        console.log('module', module)
        onSelectModule(module)
    }

    return {
        //states
        status,
        modules,
        selectedModule,
        //actions
        getModule,
        createModule,
        editModule,
        setSelectModule,
    }
}