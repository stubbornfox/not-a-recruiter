import { createRouter, createWebHistory } from "vue-router";
import JobBoard from "../views/JobBoardView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: JobBoard,
    },
    {
      path: "/candidates/new",
      name: "NewCandidate",
      component: () => import("../views/NewCandidateView.vue"),
    },
    {
      path: "/jobs/new",
      name: "NewJob",
      component: () => import("../views/NewJobView.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
