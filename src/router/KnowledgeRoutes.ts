const KnowledgeRoutes = {
  path: '/knowledge',
  component: () => import('@/layouts/full/FullLayout.vue'),
  meta: {
    requiresAuth: false
  },
  children: [
    {
      name: 'Knowledge',
      path: '',
      component: () => import('@/views/knowledge/KnowledgePage.vue')
    }
  ]
};

export default KnowledgeRoutes;
