const MainRoutes = {
  path: '/',
  component: () => import('@/layouts/full/FullLayout.vue'),
  meta: {
    requiresAuth: false
  },
  children: [
    {
      name: 'Main',
      path: '',
      component: () => import('@/views/main/MainPage.vue')
    },
    {
      name: 'Knowledge',
      path: 'knowledge',
      component: () => import('@/views/main/MainPage.vue')
    }
  ]
};

export default MainRoutes;
