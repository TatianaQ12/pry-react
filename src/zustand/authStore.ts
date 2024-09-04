import { AuthStatus, User, UserData} from '@/types/slices/authType';
import { create } from 'zustand';

interface IAuthStore {
  status: string
  user: User
  errorMessage: string | undefined
  actions: {
    onVerifying: () => void
    onLogin: (user: User) => Promise<void>
    onLogout: (payload: string | undefined) => Promise<void>
    onRefreshToken: (user: User) => Promise<void>
    clearErrorMessage: () => Promise<void>
    onChangeAuthStatus: (payload: AuthStatus) => void
  }
}

const useAuthStore = create<IAuthStore>((set) => ({
  status: AuthStatus.NOT_AUTHENTICATED,
  user: {
    id: 0,
    email: '',
    user_name: '',
    n_document: '',
    rut_company:'',
    status_confirm: '',
    validation_confirm: '',
    status: '0',
    data: {} as UserData,
    views: [],
    modules: []
  },
  errorMessage: undefined,
  actions:{
    onVerifying: async () => {
      set(state => ({
        ...state,
        status: AuthStatus.VERIFYING,
        user: state.user
      }))
    },
    onLogin: async (user: User) => {
      set({
        status: AuthStatus.AUTHENTICATED,
        user: user,
        errorMessage: undefined
      })
    },
    onLogout: async (payload: string | undefined) => {
      set(state => ({
        status: AuthStatus.NOT_AUTHENTICATED,
        user: state.user,
        errorMessage: payload
      }))
    },
    onRefreshToken: async (user: User) => {
      set(state => ({
        ...state,
        status: AuthStatus.AUTHENTICATED,
        user: user,
        errorMessage: undefined
      }))
    },
    clearErrorMessage: async () => {
      set({
        errorMessage: undefined
      })
    },
    onChangeAuthStatus: async (payload: AuthStatus) => {
      set({
        status: payload
      })
    },
  }

}));


export const useAuthStatus = () => useAuthStore(state => state.status)
export const useAuthUser = () => useAuthStore(state => state.user)
export const useAuthErrorMessage = () => useAuthStore(state => state.errorMessage)
export const useAuthActions = () => useAuthStore(state => state.actions)