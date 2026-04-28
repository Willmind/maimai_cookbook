import { createRouter, createWebHistory } from 'vue-router'

import AllRecipesView from '@/views/AllRecipesView.vue'
import HomeView from '@/views/HomeView.vue'
import NewCookingLogView from '@/views/NewCookingLogView.vue'
import NewRecipeView from '@/views/NewRecipeView.vue'
import RecipeDetailView from '@/views/RecipeDetailView.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/recipes', name: 'recipes', component: AllRecipesView },
    { path: '/recipes/new', name: 'new-recipe', component: NewRecipeView },
    { path: '/recipes/:id', name: 'recipe-detail', component: RecipeDetailView, props: true },
    {
      path: '/recipes/:id/logs/new',
      name: 'new-cooking-log',
      component: NewCookingLogView,
      props: true,
    },
  ],
})

