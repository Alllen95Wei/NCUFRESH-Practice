<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

import { useCartStore } from "@/stores/cartStore.ts";
import { useNotificationStore } from "@/stores/notificationStore.ts";

import "@material/web/button/filled-button.js";

const route = useRoute();
const cartStore = useCartStore();
const notifStore = useNotificationStore();

let itemId = route.params.id;
const itemDetail = ref({
    name: "商品",
    description: "這是一個商品的介紹內容",
    price: 10000,
    image: "https://placehold.co/400"});
const amount = ref(1);
updateItemDetail(itemId);

watch(
    () => route.params.id,
    async (newId) => {
        itemId = newId;
        await updateItemDetail(newId);
    },
    { immediate: true }
)

async function updateItemDetail(itemId) {
    const response = await axios.get(`http://localhost:3000/api/items/${itemId}`);
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
    cartStore.addToCart({id: itemId, name: itemDetail.value.name, price: itemDetail.value.price}, amount.value);
    notifStore.show(`已將 ${itemDetail.value.name} ×${amount.value} 加入購物車！`, "success");
}
</script>

<template>
    <div class="item-container">
        <img class="item-img" :src="itemDetail.image" alt=""/>
        <div class="item-detail">
            <div class="item-info">
                <span class="item-name">{{ itemDetail.name }}</span>
                <span class="item-price">NT$ {{ itemDetail.price.toLocaleString() }}</span>
                <span class="item-description">{{ itemDetail.description }}</span>
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

.item-img {
    max-height: 400px;
    max-width: 400px;
    object-fit: cover;
    border-radius: 10px;
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
