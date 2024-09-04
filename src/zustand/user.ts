import { ApiStatus } from '@/types/api/status';
import { User } from '@/types/slices/userType';
import { create } from 'zustand';

interface IUserStore {
    status: string
    users: User[]
    selectedUser: User,
    errorMessage: string | undefined
    actions: {
        onFetchUsers: (user: User[]) => Promise<void> 
        changeStatus: (payload: ApiStatus) => void
        onSelectUsers: (payload: User) => void
    }
}

const useUser = create<IUserStore>((set) => ({
    status: ApiStatus.FETCHING,
    users: [],
    selectedUser: {
        id: 0,
        iduser: 0,
        name: '', 
        surname: '',
        idcharge: 0,
        idcompany: 0,
        user_name: '',
        n_document: '',
        email: '',
        role: 0,
        idrole: 0
    },
    errorMessage: undefined,
    actions: {
        onFetchUsers: async (payload: User[]) => {
            set({
                status: ApiStatus.FETCHED,
                users: payload,
                errorMessage: undefined
            })
        },
        changeStatus: async (payload: ApiStatus) => {
            set({
                status: payload
            })
        },
        onSelectUsers: async (user: User) => {
            set(state => ({
                ...state,
                status: ApiStatus.FETCHED,
                selectedUser: user,
                errorMessage: undefined
            }))
        }
    }
}));

export const useUserStatus = () => useUser(state => state.status)
export const useUserList = () => useUser(state => state.users)
export const useUserSelect = () => useUser(state => state.selectedUser)
export const useUserErrorMessage = () => useUser(state => state.errorMessage)
export const useUserActions = () =>  useUser(state => state.actions)
