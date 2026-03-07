<script setup lang="ts">
import axios from "axios";

import "@material/web/textfield/filled-text-field.js"
import "@material/web/button/filled-button.js";
import "@material/web/icon/icon.js"

import { useNotificationStore, NotifType } from "@/stores/notificationStore";

const authApi = axios.create({ baseURL: "/api/auth" })
const notificationStore = useNotificationStore();

async function login() {
    const loginForm = document.getElementsByClassName("login-form")[0] as HTMLFormElement;
    if (loginForm.checkValidity()) {
        const data = {
            email: (document.getElementById("email-input") as HTMLInputElement).value,
            password: (document.getElementById("password-input") as HTMLInputElement).value
        };
        try {
            const response = await authApi.post("/login", data);
            if (response.status === 200) {
                window.localStorage.setItem("token", response.data.token);
                notificationStore.show("登入成功！");
                window.location.href = "/";
            }
        } catch (error) {
            console.error("Login failed:", error);
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    notificationStore.show("登入失敗。請檢查電子郵件地址和密碼是否正確。", NotifType.ERROR);
                    return;
                }
            }
            notificationStore.show("登入錯誤。請聯絡管理員。", NotifType.ERROR, 10000);
        }
    } else {
        loginForm.reportValidity();
    }
}
</script>

<template>
    <div class="login-container">
        <h1>登入</h1>
        <form class="login-form">
            <md-filled-text-field type="email" label="電子郵件地址" name="email" id="email-input" required>
                <md-icon slot="leading-icon">mail</md-icon>
            </md-filled-text-field>
            <md-filled-text-field type="password" label="密碼" name="password" id="password-input" required>
                <md-icon slot="leading-icon">password</md-icon>
            </md-filled-text-field>
            <md-filled-button class="login-btn" type="button" @click="login">
                <div class="btn-content">
                    <span class="material-symbols-outlined" style="vertical-align: middle">login</span>
                    <span>登入</span>
                </div>
            </md-filled-button>
        </form>
    </div>
</template>

<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

hr {
    border: none;
    height: 1px;
    background-color: black;
    width: 90%;
    margin: 0.5vh auto;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 1vh;
    align-items: center;
    width: 100%;
}

md-filled-text-field {
    width: 30%;
}

.login-btn {
    width: 20%;
}
</style>
