import { defineStore } from "pinia";

enum NotifType {
    SUCCESS = "success",
    ERROR = "error",
    INFO = "info"
}

interface Notification {
    id: number;
    message: string;
    notifType: NotifType;
}

export const useNotificationStore = defineStore('notification', {
    state: () => ({
        notifications: [] as Notification[]
    }),
    actions: {
        show(message: string, notifType: NotifType = NotifType.SUCCESS, duration: number = 3000) {
            const id = Date.now();

            this.notifications.push({ id, message, notifType });

            setTimeout(() => {
                this.remove(id);
            }, duration);
        },
        remove(id: number) {
            this.notifications = this.notifications.filter((n: Notification) => n.id !== id);
        }
    }
});
