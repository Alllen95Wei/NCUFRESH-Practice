<script setup>
import axios from "axios";
import { ref } from "vue";

import ProductMenu from "@/components/ProductMenu.vue";


const allProducts = ref([]);
const productApi = axios.create({ baseURL: "/api/products" })
productApi.get("/").then(response => {
    allProducts.value = response.data;
}).catch(error => {
    console.error("Failed to fetch products:", error);
});
</script>

<template>
    <div id="home-banner">
        <h1 class="quantico-bold-italic">An Online Shop</h1>
    </div>
    <div class="products-container">
        <div class="all-product-title">
            <span class="material-symbols-outlined" style="font-size: 1.5em; vertical-align: middle">storefront</span>
            <span style="font-size: 1.5em; font-weight: bold">所有商品</span>
        </div>
        <ProductMenu :products="allProducts" />
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quantico:ital,wght@1,700&display=swap');

.quantico-bold-italic {
    font-family: "Quantico", sans-serif;
    font-weight: 700;
    font-style: italic;
    font-size: 3em;
}

#home-banner {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40vh;
    width: 100%;
    color: white;
    background-image: url('@/assets/img/banner-blur.png');
    background-position: center center;
}

.products-container {
    margin: 0.5em;
}

.all-product-title {
    display: flex;
    align-items: center;
    gap: 0.5em;
}
</style>
