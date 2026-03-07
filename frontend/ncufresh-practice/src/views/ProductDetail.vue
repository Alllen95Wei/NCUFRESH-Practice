<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

import { useCartStore } from "@/stores/cartStore.ts";
import { useNotificationStore } from "@/stores/notificationStore.ts";

import "@material/web/button/filled-button.js";
import "@material/web/progress/circular-progress.js";

const route = useRoute();
const cartStore = useCartStore();
const notifStore = useNotificationStore();

const productApi = axios.create({ baseURL: "/api/products" })
let productId = route.params.id;
const productDetail = ref({
    name: "商品",
    description: "這是一個商品的介紹內容",
    price: 10000,
    image: "https://placehold.co/400"});
const amount = ref(1);
let isValidId = ref(true);

watch(
    () => route.params.id,
    async (newId) => {
        productId = newId;
        await updateItemDetail(newId);
    },
    { immediate: true }
)

async function updateItemDetail(itemId) {
    productApi.get(`/${itemId}`).then((response) => {
        productDetail.value = response.data;
        isValidId.value = true;
    }).catch((error) => {
        isValidId.value = false;
        console.error("Failed to fetch item detail:", error);
        notifStore.show("無法獲取商品資訊。請稍後再試。", "error", 5000);
    });

}

function amountAdd() {
    if (amount.value >= 99) return;
    amount.value++;
}

function amountMinus() {
    if (amount.value <= 1) return;
    amount.value--;
}

function amountInput(event) {
    const value = parseInt(event.target.value);
    if (isNaN(value) || value < 1) {
        amount.value = 1;
    } else if (value > 99) {
        amount.value = 99;
    } else {
        amount.value = value;
    }
}

function addToCart() {
    cartStore.addToCart({id: parseInt(productId), name: productDetail.value.name, price: productDetail.value.price}, amount.value);
    notifStore.show(`已將 ${productDetail.value.name} ×${amount.value} 加入購物車！`, "success");
}
</script>

<template>
    <div class="item-container" v-if="isValidId">
        <img class="item-img" :src="productDetail.image" alt=""/>
        <div class="item-detail">
            <div class="item-info">
                <span class="item-name">{{ productDetail.name }}</span>
                <span class="item-price">NT$ {{ productDetail.price.toLocaleString() }}</span>
                <span class="item-description">{{ productDetail.description }}</span>
            </div>
            <div class="item-actions">
                <div class="quantity-container">
                    <button class="quantity-btn quantity-minus-btn">
                        <span class="material-symbols-outlined" style="vertical-align: middle" @click="amountMinus">remove</span>
                    </button>
                    <input class="quantity-input" type="number" min="1" max="99" :value="amount"
                           @change="amountInput"/>
                    <button class="quantity-btn quantity-plus-btn">
                        <span class="material-symbols-outlined" style="vertical-align: middle" @click="amountAdd">add</span>
                    </button>
                </div>
                <md-filled-button class="add-to-cart-btn" @click="addToCart">
                    <div class="btn-content">
                        <span class="material-symbols-outlined" style="vertical-align: middle">add_shopping_cart</span>
                        <span>加入購物車</span>
                    </div>
                </md-filled-button>
            </div>
        </div>
    </div>
    <div class="loading-container" v-else>
        <md-circular-progress indeterminate style="transform: scale(200%)" id="loading-animation"></md-circular-progress>
    </div>
</template>

<style scoped>
.item-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 4vw;
    margin: 2vh 4vw;
    padding-top: 5vh;
}

.loading-container {
    width: 100%;
    padding-top: 50vh;
    display: flex;
    justify-content: center;
}

.item-img {
    max-height: 400px;
    max-width: 400px;
    aspect-ratio: 1/1;
    object-fit: scale-down;
    border-radius: 10px;
    background-color: #e8e8e8;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.item-detail {
    display: flex;
    gap: 2vh;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.item-info {
    display: flex;
    flex-direction: column;
    gap: 0.5vh;
    max-width: 400px;
}

.item-name {
    font-size: 3rem;
    font-weight: bold;
    color: #333;
}

.item-price {
    color: #5e9de8;
    font-weight: bold;
    font-size: 1.7rem;
    margin: 0.2em 0;
}

.item-actions {
    justify-self: flex-end;
    display: flex;
    flex-direction: row;
    gap: 0.5vw;
}

.quantity-container {
    display: flex;
    align-items: center;
}

.quantity-input {
    font-family: Courier, monospace;
    font-weight: bold;
    font-size: 1.2rem;
    width: 60px;
    height: 100%;
    padding: 0;
    border: 1px solid #ccc;
    //border: none;
    text-align: center;
}

.quantity-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 100%;
    background-color: #b6b6b6;
    //border: 1px solid #ccc;
    border: none;
    cursor: pointer;
}

.quantity-btn:hover {
    background-color: #999;
}

.quantity-minus-btn {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}

.quantity-plus-btn {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}


</style>
