<script setup>
import { onMounted } from "vue";
import axios from "axios";

import "@material/web/chips/chip-set.js";
import "@material/web/chips/filter-chip.js";

import { useCartStore } from "@/stores/cartStore.ts";
import { useNotificationStore } from "@/stores/notificationStore.ts";
import CartItem from "@/components/CartItem.vue";

const cartStore = useCartStore();
const notifStore = useNotificationStore();

const productApi = axios.create({ baseURL: "/api/products" });

function isLoggedIn() {
    return window.localStorage.getItem("token") !== null;
}

async function updateItemData() {
    for (const item of cartStore.items) {
        let newData = await productApi.get(`${item.id}`);
        newData = newData.data;
        console.log(newData);
        if (item.name !== newData.name) {
            const oldName = item.name;
            cartStore.modifyItemData(item.id, newData.name);
            notifStore.show(`已更新商品「${oldName}」名稱為「${newData.name}」`);
        }
        if (Number(item.price) !== Number(newData.price)) {
            cartStore.modifyItemData(item.id, null, newData.price);
            notifStore.show(`已更新商品「${item.name}」價格為 NTD$ ${newData.price}`);
        }
    }
}

function expandCheckout(event) {
    event.target.style.display = "none";
    document.getElementById("shipping-container").setAttribute("expanded", "");
}

function fillMemberData() {
    console.log(window.localStorage.getItem("user"))
    const userData = JSON.parse(window.localStorage.getItem("user"));
    document.getElementById("recipient-name-input").value = userData.name;
    document.getElementById("recipient-email-input").value = userData.email;
}

function clearForm() {
    if (confirm("確定要清除付款及運送資訊？")) {
        document.getElementById("checkout-form").reset();
    }
}

function submitForm() {
    const form = document.getElementById("checkout-form");
    if (form.reportValidity()) {
        const formData = new FormData(form);
        const xhr = new XMLHttpRequest();
        formData.append("token", window.localStorage.getItem("token"));
        formData.append("cart", JSON.stringify(cartStore.items));
        console.log(Object.fromEntries(formData.entries()));

        xhr.open("POST", `/api/orders`, true);
        xhr.send(formData);
    }
}

onMounted(updateItemData);
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
                <md-filled-button v-if="isLoggedIn()" id="proceed-btn" @click="expandCheckout">
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
            <div class="shipping-container" id="shipping-container">
                <hr>
                <h2>付款及運送資訊</h2>
                <form id="checkout-form" action="/api/orders" method="post">
                    <h3>付款方式</h3>
                    <div class="payment-container">
                        <md-chip-set>
                            <md-filter-chip label="Not implemented" selected></md-filter-chip>
                        </md-chip-set>
                    </div>
                    <h3>收件人資訊</h3>
                    <div class="recipient-inputs inputs-container">
                        <md-filled-button type="button" @click="fillMemberData">
                            <div class="btn-content">
                                填入會員資料
                            </div>
                        </md-filled-button>
                        <md-filled-text-field type="text" label="姓名" name="recipient-name" id="recipient-name-input" autocomplete="name" required>
                            <md-icon slot="leading-icon">person</md-icon>
                        </md-filled-text-field>
                        <md-filled-text-field type="email" label="電子郵件信箱" name="recipient-email" id="recipient-email-input" autocomplete="email" required>
                            <md-icon slot="leading-icon">mail</md-icon>
                        </md-filled-text-field>
                        <md-filled-text-field type="tel" label="電話" name="recipient-phone" id="recipient-phone-input" autocomplete="tel" required>
                            <md-icon slot="leading-icon">phone</md-icon>
                        </md-filled-text-field>
                    </div>
                    <h3>宅配地址</h3>
                    <div class="address-inputs inputs-container">
                        <md-filled-text-field type="number" label="郵遞區號" name="postal-code" id="postal-code-input"
                                              autocomplete="postal-code" minlength="3" no-spinner required>
                            <md-icon slot="leading-icon">markunread_mailbox</md-icon>
                        </md-filled-text-field>
                        <md-filled-text-field type="text" label="縣市" name="city" id="city-input" autocomplete="address-level1" required>
                            <md-icon slot="leading-icon">location_city</md-icon>
                        </md-filled-text-field>
                        <md-filled-text-field type="text" label="鄉鎮市區" name="district" id="district-input" autocomplete="address-level2" required>
                            <md-icon slot="leading-icon">location_city</md-icon>
                        </md-filled-text-field>
                        <md-filled-text-field type="text" label="街道地址" name="street-address" id="address-input" autocomplete="street-address" required>
                            <md-icon slot="leading-icon">edit_location</md-icon>
                        </md-filled-text-field>
                    </div>
                </form>
                <div class="bottom-container checkout-actions">
                    <md-filled-button class="delete-btn" type="button" @click="clearForm">
                        <div class="btn-content">
                            <span class="material-symbols-outlined">clear_all</span>
                            <span>全部清除</span>
                        </div>
                    </md-filled-button>
                    <md-filled-button @click="submitForm">
                        <div class="btn-content">
                            <span>送出訂單</span>
                            <span class="material-symbols-outlined">check</span>
                        </div>
                    </md-filled-button>
                </div>
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
    align-items: start;
    margin: 3vh 0;
}

.bottom-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.shipping-container {
    height: 0;
    display: none;
}

.shipping-container[expanded] {
    height: auto;
    display: inherit;
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

.inputs-container {
    display: flex;
    flex-direction: row;
    gap: 1em;
    width: 100%;
}

#recipient-name-input {
    flex: 2;
}

#recipient-email-input {
    flex: 3;
}

#recipient-phone-input {
    flex: 2;
}

#postal-code-input {
    flex: 1;
}

#city-input {
    flex: 1;
}

#district-input {
    flex: 1;
}

#address-input {
    flex: 4;
}

.delete-btn {
    --md-filled-button-container-color: #c12929 !important;
}

.checkout-actions {
    margin: 3vh 0;
}
</style>
