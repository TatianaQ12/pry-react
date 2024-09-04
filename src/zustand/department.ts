import { ApiStatus } from "@/types/api/status"
import { Department } from "@/types/slices/departmentType"
import { create } from "zustand"

interface IDepartment {
    status: string
    departments: Department[]
    selectedDepartment: Department,
    errorMessage: string | undefined
    actions: {
        onVerifying: () => Promise<void>
        onFetchDepartments: (rule: Department[]) => Promise<void>
        changeStatus: (payload: ApiStatus) => void
        onSelectDepartment: (payload: Department) => void
    }
}

const useDepartment = create<IDepartment>((set) => ({
    status: ApiStatus.FETCHING,
    departments: [],
    selectedDepartment: {} as Department,
    opened: false,
    errorMessage: undefined,
    actions: {
        onVerifying: async () => {
            set(state => ({
                status: ApiStatus.FETCHING,
                departments: state.departments,
                errorMessage: undefined
            }))
        },
        onFetchDepartments: async (payload: Department[]) => {
            set({
                status: ApiStatus.FETCHED,
                departments: payload,
                errorMessage: undefined
            })
        },
        onSelectDepartment: async (payload: Department) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                selectedDepartment: payload,
                errorMessage: undefined
            }))
        },
        changeStatus: async (payload: ApiStatus) => {
            set({
                status: payload
            })
        },
    }
}))

export const useDepartmentStates = () => {
    const { status, departments, selectedDepartment, errorMessage } = useDepartment(state => ({
        status: state.status,
        departments: state.departments,
        selectedDepartment: state.selectedDepartment,
        errorMessage: state.errorMessage
    }))

    return {
        status,
        departments,
        selectedDepartment,
        errorMessage
    }
}
export const useDepartmentActions = () => useDepartment(state => state.actions)