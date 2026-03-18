<script setup>
import { useCartStore } from "@/stores/cartStore.ts";

import CartItem from "@/components/CartItem.vue";

const cartStore = useCartStore();

function isLoggedIn() {
    return window.localStorage.getItem("token") !== null;
}
</script>

<template>
    <div class="cart-container">
        <h1>購物車</h1>
        <span v-if="cartStore.getItemCount() > 0">目前購物車內共有 {{ cartStore.getItemCount() }} 件商品。</span>
        <span v-else>你的購物車什麼都沒有。開始購物吧！</span>
        <div class="inner-container" v-if="cartStore.getItemCount() > 0">
            <div class="item-list">
                <CartItem v-for="item in cartStore.items" :key="item.id"
                          :id="item.id"
                          :name="item.name"
                          :price="parseFloat(item.price)"
                          :quantity="item.quantity" />
            </div>
            <div class="bottom-container">
                <div class="sum-container">
                    <span>總金額：</span>
                    <span class="sum-text">NTD$ {{ cartStore.getTotalPrice().toLocaleString() }}</span>
                </div>
                <md-filled-button v-if="isLoggedIn()">
                    <div class="btn-content">
                        <span>前往結帳</span>
                        <span class="material-symbols-outlined">shopping_cart_checkout</span>
                    </div>
                </md-filled-button>
                <md-filled-button v-else type="button" href="/login">
                    <div class="btn-content">
                        <span>請先登入</span>
                        <span class="material-symbols-outlined">login</span>
                    </div>
                </md-filled-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.inner-container {
    width: 85vw;
}

.item-list {
    display: flex;
    flex-direction: column;
    gap: 1vh;
    align-items: center;
    margin: 3vh 0;
}

.bottom-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.sum-container {
    display: flex;
    flex-direction: column;
}

.sum-text {
    font-size: 1.5em;
    font-weight: bold;
    color: #7bb1f3;
}
</style>
