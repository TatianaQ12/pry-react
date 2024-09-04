import { useNotificationActions, useNotificationStatus } from "@/zustand/notification";

export const useNotificationStore = () => {

    const statusNotification = useNotificationStatus();
    const { onSetStatusNotification } = useNotificationActions();

    const setStatusNotification = (status: boolean) => {
        onSetStatusNotification(status)
    }

    return {
        //states
        statusNotification,
        //actions
        setStatusNotification
    }
}