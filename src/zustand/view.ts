import { ApiStatus } from "@/types/api/status"
import { ViewFront } from "@/types/slices/ruleType"
import { ViewType } from "@/types/slices/viewType"
import { create } from "zustand"

interface IViewFront {
    status: string
    views: ViewFront[]
    totalRows: number
    selectedView: ViewFront,
    typesView: ViewType[]
    errorMessage: string | undefined
    actions: {
        onVerifying: () => Promise<void>
        onFetchViews: (payload: ViewFront[]) => Promise<void>
        changeStatus: (payload: ApiStatus) => void
        onSelectedView: (payload: ViewFront) => void
        onSetTotalRows: (payload: number) => void
        onFetchTypesView: (payload: ViewType[]) => Promise<void>
    }
}

const useViewFront = create<IViewFront>((set) => ({
    status: ApiStatus.FETCHING,
    views: [],
    totalRows: 0,
    selectedView: {} as ViewFront,
    typesView: [],
    opened: false,
    errorMessage: undefined,
    actions: {
        onVerifying: async () => {
            set(state => ({
                status: ApiStatus.FETCHING,
                views: state.views,
                errorMessage: undefined
            }))
        },
        onFetchViews: async (payload: ViewFront[]) => {
            set({
                status: ApiStatus.FETCHED,
                views: payload,
                errorMessage: undefined
            })
        },
        onSelectedView: async (payload: ViewFront) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                selectedView: payload,
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
        onFetchTypesView: async (payload: ViewType[]) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                typesView: payload,
                errorMessage: undefined
            }))
        },
    }

}))

export const useViewFrontStates = () => {
    const { status, views, selectedView, errorMessage, totalRows,typesView } = useViewFront(state => ({
        status: state.status,
        views: state.views,
        selectedView: state.selectedView,
        totalRows: state.totalRows,
        errorMessage: state.errorMessage,
        typesView: state.typesView
    }))

    return {
        status,
        views,
        selectedView,
        errorMessage,
        totalRows,
        typesView
    }
}
export const useViewFrontActions = () => useViewFront(state => state.actions)