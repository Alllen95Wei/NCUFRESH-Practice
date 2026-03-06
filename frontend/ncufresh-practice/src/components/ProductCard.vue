<script setup>
import { useCartStore } from "@/stores/cartStore.ts";
import { useNotificationStore } from "@/stores/notificationStore.ts";

const props = defineProps({
    id: { type: Number, required: true },
    name: { type: String, default: "Product", required: true },
    image: { type: String, default: 'https://placehold.co/400', required: true },
    price: { type: Number, default: 114514, required: true }
});

const cartStore = useCartStore();
const notifStore = useNotificationStore();

function formatPrice(value) {
    return value.toLocaleString();
}

function addToCart(event) {
    cartStore.addToCart({id: props.id, name: props.name, price: props.price});
    notifStore.show(`已將 ${props.name} 加入購物車！`, "success");
    const btnIcon = event.currentTarget.children[0].children[0];
    btnIcon.textContent = "check";
    setTimeout(() => {
        btnIcon.textContent = "add";
    }, 2000);
}

console.log(props.image);
</script>

<template>
    <div class="product-card">
        <router-link :to="'/item/' + id">
        <div class="product-image">
            <img :src="image" :alt="name + ` 的圖片`" />
        </div>
        </router-link>

        <div class="product-info">
            <router-link :to="'/item/' + id">
            <h3 class="product-name">{{ name }}</h3>
            <p class="product-price">NT$ {{ formatPrice(price) }}</p>
            </router-link>

            <md-filled-button class="add-to-cart-btn" @click="addToCart">
                <div class="btn-content">
                    <span class="material-symbols-outlined" style="vertical-align: middle">add</span>
                    <span>加入購物車</span>
                </div>
            </md-filled-button>
        </div>
    </div>
</template>

<style scoped>
a {
    text-decoration: none;
}

.product-card {
    width: 250px;
    border: 1px solid #eee;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background: #fff;
}

.product-card:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.product-image img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.product-info {
    padding: 15px;
    text-align: left;
}

.product-name {
    font-size: 1.1rem;
    margin: 0 0 10px 0;
    color: #333;
}

.product-price {
    color: #7bb1f3;
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 15px;
}

.add-to-cart-btn {
    width: 100%;
    padding: 8px;
    cursor: pointer;
}
</style>
