import { defineStore } from "pinia";

interface User {
    id: number;
    name: string;
    email: string;
}

export const useUserStore = defineStore("user", {
    state: () => ({
        user: {
            id: null,
            name: "guest",
            email: "",
        } as User | null,
    }),
    actions: {
        setUser(userData: User) {
            this.user = userData;
        },
        clearUser() {
            this.user = null;
        }
    },
    persist: true,
});
