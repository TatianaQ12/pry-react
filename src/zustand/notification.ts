import { ApiStatus } from '@/types/api/status';
import { create } from 'zustand';

interface INotificationStore {
    statusNotification: boolean,
    actions: {
        onSetStatusNotification: (payload: boolean) => void
    }
}

const useNotification= create<INotificationStore>((set) => ({
    status: ApiStatus.FETCHING,
    statusNotification: false,
    opened: false,
    errorMessage: undefined,
    actions: {
        onSetStatusNotification: async (payload: boolean) => {
            set(state => ({
                ...state,
                statusNotification: payload,
            }))
        },
    }

}));

export const useNotificationStatus = () => useNotification(state => state.statusNotification)
export const useNotificationActions = () => useNotification(state => state.actions)