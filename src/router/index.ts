import { createRouter, createWebHistory } from 'vue-router'

import AllRecipesView from '@/views/AllRecipesView.vue'
import EditCookingLogView from '@/views/EditCookingLogView.vue'
import EditRecipeView from '@/views/EditRecipeView.vue'
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
    { path: '/recipes/:id/edit', name: 'edit-recipe', component: EditRecipeView, props: true },
    {
      path: '/recipes/:id/logs/new',
      name: 'new-cooking-log',
      component: NewCookingLogView,
      props: true,
    },
    {
      path: '/recipes/:id/logs/:logId/edit',
      name: 'edit-cooking-log',
      component: EditCookingLogView,
      props: true,
    },
  ],
})

