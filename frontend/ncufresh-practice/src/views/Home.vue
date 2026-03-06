<script setup>
import axios from "axios";
import ProductMenu from "@/components/ProductMenu.vue";

const allProducts = axios.get("/api/products/").then((response) => {
    return response.data;
})
</script>

<template>
    <div id="home-banner">
        <h1 class="quantico-bold-italic">An Online Shop</h1>
    </div>
    <ProductMenu :products="allProducts" />
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
    background-image: url('/src/assets/img/banner-blur.png');
    background-position: center center;
}
</style>
