import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TasksView from '@/views/TasksView.vue'
import TaskEditView from '@/views/TaskEditView.vue'
import TaskAddView from '@/views/TaskAddView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksView,
    },
    {
      path: '/tasks/add',
      name: 'taskAddPage',
      component: TaskAddView,
    },
    {
      path: '/tasks/page/:page',
      name: 'tasksPage',
      component: TasksView,
    },
    {
      path: '/tasks/:task',
      name: 'taskEditPage',
      component: TaskEditView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
