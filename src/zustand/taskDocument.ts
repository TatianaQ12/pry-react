import { ApiStatus } from "@/types/api/status"
import { TaskDocument } from "@/types/slices/taskDocumentType"
import { create } from "zustand"

interface ITaskDocument {
    status: string
    taskDocuments: TaskDocument[]
    totalRows: number
    selectedTaskDocument: TaskDocument,
    errorMessage: string | undefined
    actions: {
        onVerifying: () => Promise<void>
        onFetchTaskDocuments: (payload: TaskDocument[]) => Promise<void>
        changeStatus: (payload: ApiStatus) => void
        onSelectedTaskDocument: (payload: TaskDocument) => void
        onSetTotalRows: (payload: number) => void
    }
}

const useTaskDocument = create<ITaskDocument>((set) => ({
    status: ApiStatus.FETCHED,
    taskDocuments: [],
    totalRows: 0,
    selectedTaskDocument: {} as TaskDocument,
    opened: false,
    errorMessage: undefined,
    actions: {
        onVerifying: async () => {
            set(state => ({
                status: ApiStatus.FETCHING,
                taskDocuments: state.taskDocuments,
                errorMessage: undefined
            }))
        },
        onFetchTaskDocuments: async (payload: TaskDocument[]) => {
            set({
                status: ApiStatus.FETCHED,
                taskDocuments: payload,
                errorMessage: undefined
            })
        },
        onSelectedTaskDocument: async (payload: TaskDocument) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                selectedTaskDocument: payload,
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

export const useTaskDocumentStates = () => {
    const { status, taskDocuments, selectedTaskDocument, errorMessage, totalRows } = useTaskDocument(state => ({
        status: state.status,
        taskDocuments: state.taskDocuments,
        selectedTaskDocument: state.selectedTaskDocument,
        errorMessage: state.errorMessage,
        totalRows: state.totalRows
    }))

    return {
        status,
        taskDocuments,
        selectedTaskDocument,
        errorMessage,
        totalRows
    }
}
export const useTaskDocumentActions = () => useTaskDocument(state => state.actions)