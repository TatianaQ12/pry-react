import { readLocalStorage, saveLocalStorage } from '@/toolbox/helpers';
import { LocalStorageKey } from '@/types';
import { ApiStatus } from '@/types/api/status';
import { create } from 'zustand';

interface IStylesModeStore {
    modeStyle: string,
    actions: {
        onSetModeStyle: (payload: string) => void
    }
}

const useStylesMode = create<IStylesModeStore>((set) => ({
    status: ApiStatus.FETCHING,
    modeStyle: readLocalStorage(LocalStorageKey.THEME_MODE) ? readLocalStorage(LocalStorageKey.THEME_MODE) : 'light',
    opened: false,
    errorMessage: undefined,
    actions: {
        onSetModeStyle: async (payload: string) => {
            saveLocalStorage(LocalStorageKey.THEME_MODE, payload)
            set(state => ({
                ...state,
                modeStyle: payload,
            }))
        },
    }

}));

export const useStylesModeStyle = () => useStylesMode(state => state.modeStyle)
export const useStylesModeActions = () => useStylesMode(state => state.actions)