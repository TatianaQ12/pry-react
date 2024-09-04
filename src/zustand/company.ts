import { ApiStatus } from '@/types/api/status';
import { Company } from '@/types/slices/companyType'
import { create } from 'zustand';

interface ICompanyStore {
    status: string
    companies: Company[]
    selectedCompany: Company,
    errorMessage: string | undefined
    actions: {
        onFetchCompanies: (company: Company[]) => Promise<void> 
        changeStatus: (payload: ApiStatus) => void
        onSelectCompany: (payload: Company) => void
    }
}

const useCompany = create<ICompanyStore>((set) => ({
    status: ApiStatus.FETCHING,
    companies: [],
    selectedCompany: {
        id: 0,
        registry_number: '',
        business_name: '',
        phone: '',
        email: '',
        contact_name: '',
        contact_email: '',
        website: '',
        fax: '',
        main_address: '',
        iddistrict: 0
    },
    errorMessage: undefined,
    actions: {
        onFetchCompanies: async (payload: Company[]) => {
            set({
                status: ApiStatus.FETCHED,
                companies: payload,
                errorMessage: undefined
            })
        },
        changeStatus: async (payload: ApiStatus) => {
            set({
                status: payload
            })
        },
        onSelectCompany: async (company: Company) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                selectedCompany: company,
                errorMessage: undefined
            }))
        }
    }
}));

export const useCompanyStatus = () => useCompany(state => state.status)
export const useCompanyList = () => useCompany(state => state.companies)
export const useCompanySelect = () => useCompany(state => state.selectedCompany)
export const useCompanyErrorMessage = () => useCompany(state => state.errorMessage)
export const useCompanyActions = () =>  useCompany(state => state.actions)
