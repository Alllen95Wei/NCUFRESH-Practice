<script setup lang="ts">
import { onMounted } from "vue";
import { useAuth } from "vue-auth3";

import "@material/web/textfield/filled-text-field.js"
import "@material/web/button/filled-button.js";
import "@material/web/icon/icon.js"

const auth = useAuth();

function register() {
    const registerForm = document.getElementsByClassName("register-form")[0] as HTMLFormElement;
    if (registerForm.checkValidity()) {
        auth.register({
            body: {
                name: (registerForm.elements.namedItem("name") as HTMLInputElement).value,
                email: (registerForm.elements.namedItem("email") as HTMLInputElement).value,
                password: (registerForm.elements.namedItem("password") as HTMLInputElement).value
            }
        });
    } else {
        registerForm.reportValidity();
    }
}

onMounted(() => {
    const passwordInput = document.getElementById("password-input") as HTMLInputElement;
    const passwordAgainInput = document.getElementById("password-again-input") as HTMLInputElement;

    function comparePassword() {
        if (passwordInput.value !== passwordAgainInput.value) {
            passwordAgainInput.setCustomValidity("密碼不一致。");
        } else {
            passwordAgainInput.setCustomValidity(null);
        }
    }
    passwordInput.addEventListener("input", comparePassword);
    passwordAgainInput.addEventListener("input", comparePassword);
});
</script>

<template>
    <div class="register-container">
        <h1>註冊</h1>
        <form class="register-form">
            <md-filled-text-field type="text" label="使用者名稱" name="name" max-length="30" required>
                <md-icon slot="leading-icon">account_circle</md-icon>
            </md-filled-text-field>
            <md-filled-text-field type="email" label="電子郵件地址" name="email" required>
                <md-icon slot="leading-icon">mail</md-icon>
            </md-filled-text-field>
            <md-filled-text-field type="password" label="密碼" name="password" id="password-input" required>
                <md-icon slot="leading-icon">password</md-icon>
            </md-filled-text-field>
            <md-filled-text-field type="password" label="確認密碼" name="password-again" id="password-again-input" required>
                <md-icon slot="leading-icon">password</md-icon>
            </md-filled-text-field>
            <md-filled-button class="login-btn" type="button" @click="register">
                <div class="btn-content">
                    <span class="material-symbols-outlined" style="vertical-align: middle">person_add</span>
                    <span>註冊</span>
                </div>
            </md-filled-button>
        </form>
    </div>
</template>

<style scoped>
.register-container {
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

.register-form {
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
