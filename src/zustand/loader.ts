import { create } from 'zustand';

interface ILoaderStore {
  openLoader: boolean
  actions: {
    onActionLoader: (payload: boolean) => void
  }
}

const useLoaderStore = create<ILoaderStore>((set) => ({
    openLoader: true,
    actions: {
        onActionLoader: async (payload: boolean) => {
            set(state => ({
                ...state,
                openLoader: payload
            }))
        }
    }

}));


export const useLoaderOpen = () => useLoaderStore(state => state.openLoader)
export const useLoaderActions = () => useLoaderStore(state => state.actions)