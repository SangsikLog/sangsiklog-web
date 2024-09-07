import { createRouter, createWebHistory } from 'vue-router';
import AuthRoutes from "@/router/AuthRoutes";

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            component: () => import('@/views/pages/maintenance/error/Error404Page.vue')
        },
        AuthRoutes
    ]
});
