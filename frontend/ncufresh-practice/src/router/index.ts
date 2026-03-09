import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// Views
import Home from "@/views/Home.vue"
import ProductDetail from "@/views/ProductDetail.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

// Routes
const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/product/:id",
        name: "product-detail",
        component: ProductDetail,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/register",
        name: "register",
        component: Register,
    }
];

const router = createRouter(
    {
        history: createWebHistory(),
        routes: routes
    }
)

export default router;
