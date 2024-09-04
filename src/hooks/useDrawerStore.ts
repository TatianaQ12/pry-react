import { useDrawerActions, useDrawerOpen } from "@/zustand/drawer";


export const useDrawerStore = () => {

  const drawerOpen = useDrawerOpen();
  const { onOpenDrawer } = useDrawerActions();

  const openDrawer = (value: boolean) => {
    onOpenDrawer(value)
  }
  return {
    //states
    drawerOpen,
    //actions
    openDrawer
  }
}