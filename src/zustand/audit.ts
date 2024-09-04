import { ApiStatus } from "@/types/api/status"
import { Audit } from "@/types/slices/auditType"
import { create } from "zustand"

interface IAudit {
    status: string
    audits: Audit[]
    selectedAudit: Audit,
    errorMessage: string | undefined
    actions: {
        onVerifying: () => Promise<void>
        onFetchAudit: (rule: Audit[]) => Promise<void>
        changeStatus: (payload: ApiStatus) => void
        onSelectAudit: (payload: Audit) => void
    }
}

const useAudit = create<IAudit>((set) => ({
    status: ApiStatus.FETCHING,
    audits: [],
    selectedAudit: {} as Audit,
    opened: false,
    errorMessage: undefined,
    actions: {
        onVerifying: async () => {
            set(state => ({
                status: ApiStatus.FETCHING,
                audits: state.audits,
                errorMessage: undefined
            }))
        },
        onFetchAudit: async (payload: Audit[]) => {
            set({
                status: ApiStatus.FETCHED,
                audits: payload,
                errorMessage: undefined
            })
        },
        onSelectAudit: async (payload: Audit) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                selectedAudit: payload,
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

export const useAuditStates = () => {
    const { status, audits, selectedAudit, errorMessage } = useAudit(state => ({
        status: state.status,
        audits: state.audits,
        selectedAudit: state.selectedAudit,
        errorMessage: state.errorMessage
    }))

    return {
        status,
        audits,
        selectedAudit,
        errorMessage
    }
}
export const useAuditActions = () => useAudit(state => state.actions)