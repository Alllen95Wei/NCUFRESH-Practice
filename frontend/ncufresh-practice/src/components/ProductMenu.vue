<script setup>
import ProductCard from './ProductCard.vue';

defineProps({
    products: {
        type: Array,
        required: true,
    }
});
</script>

<template>
    <div class="product-grid">
        <ProductCard
            v-for="product in products"
            :id="product.id"
            :name="product.name"
            :price="product.price"
            :image="product.image"
        />
    </div>
</template>

<style scoped>
    .product-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        justify-items: center;
    }
</style>
