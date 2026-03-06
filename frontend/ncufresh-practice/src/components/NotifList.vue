<script setup>
import { useNotificationStore } from "@/stores/notificationStore.ts";

const notifStore = useNotificationStore();
</script>

<template>
    <div class="container">
        <TransitionGroup name="notif-list">
            <div v-for="notif in notifStore.notifications"
                 :key="notif.id"
                 :class="`${notif.notifType}-toast toast-item`">
                <span class="material-symbols-outlined" style="font-size: 1.5rem"
                      v-if="notif.notifType === 'success'">check_circle</span>
                <span class="material-symbols-outlined" style="font-size: 1.5rem"
                      v-else-if="notif.notifType === 'error'">error</span>
                <span class="material-symbols-outlined" style="font-size: 1.5rem"
                      v-else>info</span>
                <span>{{ notif.message }}
                </span>
                <button class="close-btn" @click="notifStore.remove(notif.id)">×</button>
            </div>
        </TransitionGroup>
    </div>
</template>

<style scoped>
.container {
    position: fixed;
    bottom: 0;
    right: 5px;
    margin-bottom: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    gap: 0.25em;
    z-index: 9999;
}

.toast-item {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 250px;
    padding: 12px 20px;
    background: #323232;
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    border-left: 5px solid #8c8c8c;
}

.success-toast {
    border-color: #42b883;
}

.error-toast {
    border-color: #fa6b61;
}

.info-toast {
    border-color: #5282fa;
}

.close-btn {
    margin-left: auto;
    background: none;
    border: none;
    color: rgba(255,255,255,0.5);
    cursor: pointer;
    font-size: 1.2rem;
}

/* TransitionGroup animations */
.notif-list-enter-active, .notif-list-leave-active, .notif-list-move {
    transition: all 0.4s ease;
}
.notif-list-enter-from {
    opacity: 0;
    transform: translateX(30px);
}
.notif-list-leave-to {
    opacity: 0;
    transform: scale(0.9) translateX(30px);
}
</style>
