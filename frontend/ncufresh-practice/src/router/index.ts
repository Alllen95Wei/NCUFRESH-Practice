import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// Views
import Home from "@/views/Home.vue"
import ItemDetail from "@/views/ItemDetail.vue";
import Login from "@/views/Login.vue";

// Routes
const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/item/:id",
        name: "item-detail",
        component: ItemDetail,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            auth: false
        }
    }
];

const router = createRouter(
    {
        history: createWebHistory(),
        routes: routes
    }
)

export default router;
