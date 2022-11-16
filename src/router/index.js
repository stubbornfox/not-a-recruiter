import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [{
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/LoginView.vue"),
      meta: { layout: 'PlainLayout' }
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../views/RegisterView.vue"),
      meta: { layout: 'PlainLayout' }
    },
    {
      path: "/candidates/new",
      name: "NewCandidate",
      component: () => import("../views/NewCandidateView.vue"),
    },
    {
      path: "/account/profile",
      name: "AccountProfile",
      component: () => import("../views/AccountProfileView.vue"),
    },
    {
      path: "/jobs/:slug",
      name: "JobBoard",
      component: () => import("../views/JobBoardView.vue"),
      children: [{
          path: 'setup/details',
          name: 'JobSetupDetails',
          component: () => import("../views/JobSetupDetailView.vue"),
        },
        {
          path: 'setup/description',
          name: 'JobSetupDescription',
          component: () => import("../views/JobSetupDescriptionView.vue"),
        },
        {
          path: 'stages/:stage/applicants',
          name: 'JobStageApplicant',
          component: () => import("../views/JobStageApplicantView.vue"),
        },
      ],
    },
    {
      path: "/settings",
      name: "Settings",
      children: [{
        path: 'jobboard',
        name: 'SettingJobBoard',
        component: () => import("../views/SettingJobBoardView.vue"),
        children: [
        {
          path: 'branding',
          name: 'SettingJobBoardBranding',
          component: () => import("../views/SettingJobBoardBrandingView.vue"),
        },
        {
          path: 'content',
          name: 'SettingJobBoardContent',
          component: () => import("../views/SettingJobBoardContentView.vue"),
        },
        {
          path: 'seo',
          name: 'SettingJobBoardSeo',
          component: () => import("../views/SettingJobBoardSeoView.vue"),
        },
        {
          path: 'navigation',
          name: 'SettingJobBoardNavigation',
          component: () => import("../views/SettingJobBoardNagigationView.vue"),
        },
        {
          path: 'custom-domain',
          name: 'SettingJobBoardCustomDomain',
          component: () => import("../views/SettingJobBoardCustomDomainView.vue"),
        },

        ]
      }],
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

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  const authStore = useAuthStore();

  if (authRequired && !loggedIn) {
    next({ name: 'Login' })
    authStore.returnUrl = to.fullPath;
  } else next()
});

export default router;
