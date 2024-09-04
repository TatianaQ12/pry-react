import { ApiStatus } from '@/types/api/status';
import { Module } from '@/types/slices/moduleType';
import { create } from 'zustand';

interface IModuleStore {
  status: string
  modules: Module []
  selectedModule: Module,
  errorMessage: string | undefined
  actions: {
    onVerifying: () => Promise<void>
    onFetchModules: (module: Module[]) => Promise<void>
    changeStatus: (payload: ApiStatus) => void
    onSelectModule: (payload: Module ) => void
  }
}

const useModule = create<IModuleStore>((set) => ({
    status: ApiStatus.FETCHING,
    modules: [],
    selectedModule: {
        id: 0,
        name: '',
        type: '',
        type_name: '',
        icon: '',
        status: '',
    },
    opened: false,
    errorMessage:  undefined,
    actions: {
        onVerifying: async () => {
          set(state => ({
            status: ApiStatus.FETCHING,
            modules: state.modules,
            errorMessage:  undefined
          }))
        },
        onFetchModules: async (payload: Module []) => {
          set({
            status: ApiStatus.FETCHED,
            modules: payload,
            errorMessage: undefined
          })
        },
        onSelectModule: async (payload: Module ) => {
          set(state => ({
            ...state,
            status: ApiStatus.FETCHED,
            selectedModule: payload,
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

export const useModuleStatus = () => useModule(state => state.status)
export const useModuleList = () => useModule(state => state.modules)
export const useModuleSelectModule = () => useModule(state => state.selectedModule)
export const useModuleErrorMessage = () => useModule(state => state.errorMessage)
export const useModuleActions = () => useModule(state => state.actions)