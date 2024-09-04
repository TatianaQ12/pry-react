import { ApiStatus } from "../types/api/status"
import { CompanyAPI } from "../apis/CompanyAPI"
import { toast } from "react-hot-toast"
import { Company } from "../types/slices/companyType"
import { useCompanyActions, useCompanyList, useCompanySelect, useCompanyStatus } from "@/zustand/company"

export const useCompanyStore = () => {

    const companies = useCompanyList();
    const status = useCompanyStatus();
    const selectedCompany = useCompanySelect();
    const { onFetchCompanies, changeStatus, onSelectCompany } = useCompanyActions();

    const getCompanies = async (data?:any) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await CompanyAPI.getCompanies(data)
            if (response?.code === 400) {
                toast.error(response?.data?.message)
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            const { detail } = response.data
            onFetchCompanies(detail)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const createCompany = async (data: any) => {
        try {
            changeStatus(ApiStatus.FETCHING)
            const response = await CompanyAPI.createCompany(data)
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

    const editCompany = async (idcompany: number, data: any) => {
        try {
            changeStatus(ApiStatus.FETCHING)
            const response = await CompanyAPI.editCompany(idcompany, data)
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

    const deleteCompany = async (idcompany: number) => {
        try {
            changeStatus(ApiStatus.FETCHING)
            const response = await CompanyAPI.deleteCompany(idcompany)
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

    const setSelectedCompany = (company: Company) => {
        try {
            onSelectCompany(company)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        //states
        companies,
        status,
        selectedCompany,
        //actions
        getCompanies,
        createCompany,
        editCompany,
        deleteCompany,
        setSelectedCompany
    }
}