import { useLoaderActions, useLoaderOpen } from "@/zustand/loader";

export const useLoaderStore = () => {
  const openLoader = useLoaderOpen();
  const { onActionLoader } = useLoaderActions();

  const actionLoader = (value: boolean) => {
    onActionLoader(value)
  }
  return {
    //states
    openLoader,
    //actions
    actionLoader
  }
}