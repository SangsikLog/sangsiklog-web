const AuthRoutes = {
  path: '/auth',
  component: () => import('@/layouts/blank/BlankLayout.vue'),
  meta: {
    requiresAuth: false
  },
  children: [
    {
      name: 'Login',
      path: 'login',
      component: () => import('@/views/auth/LoginPage.vue')
    },
    {
      name: 'Register',
      path: 'register',
      component: () => import('@/views/auth/RegisterPage.vue')
    }
  ]
};

export default AuthRoutes;
