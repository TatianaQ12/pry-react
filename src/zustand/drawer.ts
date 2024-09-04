import { create } from 'zustand';

interface IDrawerStore {
  drawerOpen: boolean
  actions: {
    onOpenDrawer: (payload: boolean) => void
  }
}

const useDrawerStore = create<IDrawerStore>((set) => ({
    drawerOpen: false,
    actions: {
        onOpenDrawer: async (payload: boolean) => {
            set(state => ({
                ...state,
                drawerOpen: payload
            }))
        }
    }

}));


export const useDrawerOpen = () => useDrawerStore(state => state.drawerOpen)
export const useDrawerActions = () => useDrawerStore(state => state.actions)