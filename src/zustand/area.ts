import { ApiStatus } from "@/types/api/status"
import { Area } from "@/types/slices/areaType"
import { create } from "zustand"

interface IArea {
    status: string
    areas: Area[]
    totalRows: number
    selectedArea: Area,
    errorMessage: string | undefined
    actions: {
        onVerifying: () => Promise<void>
        onFetchAreas: (payload: Area[]) => Promise<void>
        changeStatus: (payload: ApiStatus) => void
        onSelectedArea: (payload: Area) => void
        onSetTotalRows: (payload: number) => void
    }
}

const useArea = create<IArea>((set) => ({
    status: ApiStatus.FETCHED,
    areas: [],
    totalRows: 0,
    selectedArea: {} as Area,
    opened: false,
    errorMessage: undefined,
    actions: {
        onVerifying: async () => {
            set(state => ({
                status: ApiStatus.FETCHING,
                areas: state.areas,
                errorMessage: undefined
            }))
        },
        onFetchAreas: async (payload: Area[]) => {
            set({
                status: ApiStatus.FETCHED,
                areas: payload,
                errorMessage: undefined
            })
        },
        onSelectedArea: async (payload: Area) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                selectedArea: payload,
                errorMessage: undefined
            }))
        },
        changeStatus: async (payload: ApiStatus) => {
            set({
                status: payload
            })
        },
        onSetTotalRows: async (payload: number) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                totalRows: payload,
                errorMessage: undefined
            }))
        },
    }
}))

export const useAreaStates = () => {
    return useArea(state => ({
        status: state.status,
        areas: state.areas,
        selectedArea: state.selectedArea,
        errorMessage: state.errorMessage,
        totalRows: state.totalRows
    }))
}
export const useAreaActions = () => useArea(state => state.actions)