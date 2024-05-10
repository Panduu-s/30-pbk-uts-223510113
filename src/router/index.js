// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import TodoApp from '../views/MyTodoList.vue';
import Posts from '../views/Posts.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MyTodoList',
      component: TodoApp
    },
    {
      path: '/Posts',
      name: 'Posts',
      component: Posts
    }
  ]
})

export default router
