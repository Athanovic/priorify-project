import {useEffect} from "react";
import useSettings from "./useSettings";

function useNotifications() {
   const {notificationsEnabled} = useSettings();

   useEffect(() => {
    if (!notificationsEnabled) return;
    if("Notification" in window) {
        Notification.requestPermission();
    }
   }, [notificationsEnabled]);

const notify = (message) => {
    if (!notificationsEnabled) return;

    if (Notification.permission === "granted") {
        new Notification(message);
    }
};

    return {notify};
}

export default useNotifications;
