import { ApiStatus } from '@/types/api/status';
import { Rule, ViewFront } from '@/types/slices/ruleType';
import { create } from 'zustand';

interface IRuleStore {
  status: string
  rules: Rule []
  views: ViewFront []
  viewsEnabled: ViewFront []
  viewsDisabled: ViewFront []
  selectedRule: Rule,
  errorMessage: string | undefined
  actions: {
    onVerifying: () => Promise<void>
    onFetchRules: (rule: Rule[]) => Promise<void>
    onFetchViews: (rule: ViewFront[]) => Promise<void>
    onFetchViewsEnabled: (rule: ViewFront[]) => Promise<void>
    onFetchViewsDisabled: (rule: ViewFront[]) => Promise<void>
    changeStatus: (payload: ApiStatus) => void
    onSelectRule: (payload: Rule ) => void
  }
}

const useRule = create<IRuleStore>((set) => ({
    status: ApiStatus.FETCHING,
    rules: [],
    views: [],
    viewsEnabled: [],
    viewsDisabled: [],
    selectedRule: {
        id: 0,
        name: '',
        status: '',
    },
    opened: false,
    errorMessage:  undefined,
    actions: {
        onVerifying: async () => {
          set(state => ({
            status: ApiStatus.FETCHING,
            rules: state.rules,
            errorMessage:  undefined
          }))
        },
        onFetchRules: async (payload: Rule []) => {
          set({
            status: ApiStatus.FETCHED,
            rules: payload,
            errorMessage: undefined
          })
        },
        onFetchViews: async (payload: ViewFront []) => {
          set({
            status: ApiStatus.FETCHED,
            views: payload,
            errorMessage: undefined
          })
        },
        onFetchViewsEnabled: async (payload: ViewFront []) => {
          set({
            status: ApiStatus.FETCHED,
            viewsEnabled: payload,
            errorMessage: undefined
          })
        },
        onFetchViewsDisabled: async (payload: ViewFront []) => {
          set({
            status: ApiStatus.FETCHED,
            viewsDisabled: payload,
            errorMessage: undefined
          })
        },
        onSelectRule: async (payload: Rule ) => {
          set(state => ({
            ...state,
            status: ApiStatus.FETCHED,
            selectedRule: payload,
            errorMessage: undefined
          }))
        },
        changeStatus: async ( payload: ApiStatus) => {
          set({
              status : payload
            })
        },
      }

}));

export const useRuleStatus = () => useRule(state => state.status)
export const useRuleList = () => useRule(state => state.rules)
export const useRuleListView = () => useRule(state => state.views)
export const useRuleListViewEnabled = () => useRule(state => state.viewsEnabled)
export const useRuleListViewDisabled = () => useRule(state => state.viewsDisabled)
export const useRuleSelectRule = () => useRule(state => state.selectedRule)
export const useRuleErrorMessage = () => useRule(state => state.errorMessage)
export const useRuleActions = () => useRule(state => state.actions)