import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/candidates/new",
      name: "NewCandidate",
      component: () => import("../views/NewCandidateView.vue"),
    },
    {
      path: "/jobs/:slug",
      name: "JobBoard",
      component: () => import("../views/JobBoardView.vue"),
      children: [
        {
          path: 'setup/details',
          name: 'JobSetupDetails',
          component: () => import("../views/JobSetupDetail.vue"),
        },
        {
          path: 'stages/:stage/applicants',
          name: 'JobStageApplicant',
          component: () => import("../views/JobStageApplicant.vue"),
        },
      ],
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
