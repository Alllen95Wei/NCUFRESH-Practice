<script setup>
import { useCartStore } from "@/stores/cartStore.ts";

const cartStore = useCartStore();

function isLoggedIn() {
    return window.localStorage.getItem("token") !== null;
}

function logout() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("avatar_url");
    window.location.href = "/";
}

function getAvatarUrl() {
    return window.localStorage.getItem("avatar_url") || "https://placehold.co/48";
}
</script>

<template>
    <header>
        <a id="home-nav" href="/">
            <span class="material-symbols-outlined" style="font-size: xx-large">shopping_bag_speed</span>
            <span class="quantico-bold-italic">An Online Shop</span>
        </a>
        <div id="menu-list">
            <div class="menu-item">
                <router-link to="/cart">
                <div class="cart-container" style="color: black">
                    <span class="material-symbols-outlined icon-btn cart-btn">shopping_cart</span>
                    <span class="cart-count" v-if="cartStore.getItemCount() >= 10">9+</span>
                    <span class="cart-count" v-else-if="cartStore.getItemCount() > 0">{{ cartStore.getItemCount() }}</span>
                </div>
                </router-link>
                <span @click="logout" v-if="isLoggedIn()" class="material-symbols-outlined icon-btn">logout</span>
                <router-link v-else to="/login" style="color: black">
                <span class="material-symbols-outlined icon-btn">login</span>
                </router-link>
            </div>
            <img id="user-avatar" alt="User Avatar" v-if="isLoggedIn" :src="getAvatarUrl()" />
            <img id="user-avatar" alt="User Avatar" v-else src="https://www.gravatar.com/avatar" />
        </div>
    </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quantico:ital,wght@1,700&display=swap');

.quantico-bold-italic {
    font-family: "Quantico", sans-serif;
    font-weight: 700;
    font-style: italic;
}

.material-symbols-outlined {
    font-variation-settings:
        'FILL' 1,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                          supported by Chrome, Edge, Opera and Firefox */
}

header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #bcbcbc;
    display: flex;
    justify-content: space-between;
    z-index: 9999;
}

#home-nav {
    display: flex;
    flex-direction: row;
    gap: 0.25em;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    padding: 0.25em;
    text-decoration: none;
    color: black;
}

#menu-list {
    display: flex;
    flex-direction: row;
    gap: 0.25em;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    padding: 0.25em;
}

.menu-item {
    display: flex;
    flex-direction: row;
    gap: 0.25em;
    justify-content: center;
    align-items: center;
}

.cart-container {
    position: relative;
}

.cart-count {
    font-family: Courier, monospace;
    font-weight: bold;
    font-size: 0.8em;
    color: white;
    background-color: red;
    border-radius: 1em;
    padding: 0.1em 0.3em;
    position: absolute;
    top: -5px;
    right: -5px;
}

#user-avatar {
    border-radius: 50%;
    max-height: 3em;
}

.icon-btn {
    padding: 0.25em;
    border-radius: 50%;
    transition: background-color 0.2s ease-in-out;
    cursor: pointer;
}

.icon-btn:hover {
    background-color: rgba(0, 0, 0, 0.15 );
}
</style>
