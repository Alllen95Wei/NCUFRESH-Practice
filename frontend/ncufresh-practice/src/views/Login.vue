<script setup lang="ts">
import {useAuth} from "vue-auth3";

import "@material/web/textfield/filled-text-field.js"
import "@material/web/button/filled-button.js";
import "@material/web/icon/icon.js"

const auth = useAuth();

function login() {
    const loginForm = document.getElementsByClassName("login-form")[0] as HTMLFormElement;
    if (loginForm.checkValidity()) {
        auth.login({
            body: {
                email: (loginForm.elements.namedItem("email") as HTMLInputElement).value,
                password: (loginForm.elements.namedItem("password") as HTMLInputElement).value
            }
        })
    }
}
</script>

<template>
    <div class="login-container">
        <h1>登入</h1>
        <form class="login-form">
            <md-filled-text-field type="email" label="電子郵件地址" name="email" required>
                <md-icon slot="leading-icon">mail</md-icon>
            </md-filled-text-field>
            <md-filled-text-field type="password" label="密碼" name="password" required>
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
