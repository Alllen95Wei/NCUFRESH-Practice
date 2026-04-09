<script setup>
import {ref, watch} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";

import CartItem from "@/components/CartItem.vue";
import {useNotificationStore} from "@/stores/notificationStore.ts";

const orderApi = axios.create({
    baseURL: "/api/orders",
    headers: { "Authorization": localStorage.getItem("token") }
});

const notifStore = useNotificationStore();
const route = useRoute();
const orderDetail = ref({});
let isValidId = ref(true);

watch(
    () => route.params.id,
    async (newId) => {
        updateOrderDetail(newId);
    },
    { immediate: true }
)

function updateOrderDetail(orderId) {
    orderApi.get(`${orderId}`).then((response) => {
        orderDetail.value = response.data;
        isValidId.value = true;
    }).catch((error) => {
        isValidId.value = false;
        console.error("Failed to fetch order detail:", error);
        notifStore.show("無法取得訂單資訊。請稍後再試。", "error", 5000);
    });
}
</script>

<template>
    <div class="order-container">
        <h1>訂單資訊</h1>
        <div class="detail-container">
            <hr>
            <h2>商品清單</h2>
            <div class="item-list">
                <CartItem v-for="item in orderDetail.products" :key="item.id"
                          :id="item.id"
                          :name="item.name"
                          :price="parseFloat(item.OrderItem.price)"
                          :quantity="item.OrderItem.quantity"
                          :readonly="true"  />
            </div>
            <div class="sum-container">
                <span>總金額：</span>
                <span class="sum-text">NTD$ {{ Number(orderDetail.totalAmount).toLocaleString() }}</span>
            </div>
            <h2>運送資訊</h2>
            <table class="delivery-detail">
                <tbody>
                    <tr>
                        <td><span class="material-symbols-outlined">location_on</span></td>
                        <td>{{ orderDetail.shippingAddress }}</td>
                    </tr>
                    <tr>
                        <td><span class="material-symbols-outlined">person</span></td>
                        <td>{{ orderDetail.recipientName }}</td>
                    </tr>
                    <tr>
                        <td><span class="material-symbols-outlined">mail</span></td>
                        <td>{{ orderDetail.recipientEmail }}</td>
                    </tr>
                    <tr>
                        <td><span class="material-symbols-outlined">phone</span></td>
                        <td>{{ orderDetail.recipientPhone }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.order-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.detail-container {
    width: 80%;
}

.item-list {
    display: flex;
    flex-direction: column;
    gap: 1vh;
    align-items: start;
    margin-top: 0.5em;
    margin-bottom: 3vh;
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

table {
    font-size: 1.25em;
}

tr {
    height: 1rem;
}

td {
    padding: 0.25em 0.5em;
    vertical-align: middle;
    background-color: #ccc;
}

/* 第一欄第一列：左上 */
tr:first-child td:first-child{
    border-top-left-radius: 0.5em;
}
/* 第一欄最後列：左下 */
tr:last-child td:first-child{
    border-bottom-left-radius: 0.5em;
}
/* 最後欄第一列：右上 */
tr:first-child td:last-child{
    border-top-right-radius: 0.5em;
}
/* 最後欄第一列：右下 */
tr:last-child td:last-child{
    border-bottom-right-radius: 0.5em;
}

.material-symbols-outlined {
    vertical-align: middle;
}
</style>
