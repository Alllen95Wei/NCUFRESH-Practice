<script setup>
import Header from "@/components/Header.vue";
import NotifList from "@/components/NotifList.vue";
</script>

<template>
    <Header></Header>

    <main>
        <RouterView></RouterView>
    </main>

    <NotifList></NotifList>
</template>

<style scoped>

</style>
