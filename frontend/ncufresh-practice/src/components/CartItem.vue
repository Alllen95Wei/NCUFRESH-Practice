<script setup>
import {defineProps, onMounted, ref} from "vue";
import axios from "axios";

import "@material/web/button/filled-button.js";

import { useCartStore } from "@/stores/cartStore.ts";

const props = defineProps({
    id: Number,
    name: String,
    price: Number,
    quantity: Number,
});
const cartStore = useCartStore();
const productApi = axios.create({ baseURL: "/api/products" });
const productImage = ref("https://placehold.co/50");
const productQuantity = ref(props.quantity);

function getItemImage() {
    productApi.get(`${props.id}/image`).then((res) => {
        if (res.status === 200) {
            productImage.value = res.data.image;
        }
    }).catch((err) => {
        console.error("Failed to fetch product image:", err);
    });
}

function amountPlus() {
    if (productQuantity.value === 99) return;
    productQuantity.value++;
    cartStore.changeQuantity(props.id, productQuantity.value);
}

function amountMinus() {
    if (productQuantity.value === 1) {
        removeItem();
        return;
    }
    productQuantity.value--;
    cartStore.changeQuantity(props.id, productQuantity.value);
}

function removeItem() {
    if (confirm(`確定要移除 ${props.name} 嗎？`)) {
        cartStore.removeFromCart(props.id);
    }
}

onMounted(() => {
    getItemImage();
});
</script>

<template>
    <div class="cart-item">
        <div class="item-info">
            <img class="item-img" :src="productImage" :alt="name + ' 的圖片'" />
            <div class="item-info-text">
                <span class="item-name">{{ name }}</span>
                <span class="item-price">NTD$ {{ price.toLocaleString() }}</span>
            </div>
        </div>
        <div class="actions">
            <div class="quantity-container">
                <input class="quantity-input" type="number" min="1" max="99" :value="productQuantity"/>
                <div class="quantity-btn-container">
                    <button class="quantity-btn" style="border-top-right-radius: 5px" @click="amountPlus">
                        <span class="material-symbols-outlined">add</span>
                    </button>
                    <button class="quantity-btn" style="border-bottom-right-radius: 5px" @click="amountMinus">
                        <span class="material-symbols-outlined">remove</span>
                    </button>
                </div>
            </div>
            <md-filled-button @click="removeItem">
                <div class="btn-content">
                    <span class="material-symbols-outlined" style="vertical-align: middle">delete</span>
                </div>
            </md-filled-button>
        </div>
    </div>
</template>

<style scoped>
* {
    --md-filled-button-container-color: #c12929;
}

.cart-item {
    width: 100%;
    background-color: #e8e8e8;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
}

.item-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.item-img {
    height: 12vh;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 5px;
}

.item-info-text {
    display: flex;
    flex-direction: column;
    gap: 0.25em;
}

.item-name {
    font-size: larger;
    font-weight: bold;
}

.actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.quantity-container {
    display: flex;
    flex-direction: row;
}

.quantity-input {
    border: none;
    text-align: center;
    height: -webkit-fill-available;
    font-size: 1.2em;
    border-radius: 5px 0 0 5px;
}

/* Gemini: Disable number input arrows */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}

.quantity-btn {
    border: none;
    background-color: #b6b6b6;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.quantity-btn:hover {
    background-color: #999;
}

.quantity-btn-container {
    display: flex;
    flex-direction: column;
}
</style>
