import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useAuthStore } from '@/stores/auth';
import DefaultLayout from '../layouts/DefaultLayout.vue'
import PlainLayout from '../layouts/PlainLayout.vue'

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [{
      path: '',
      name: 'PlainLayout',
      component: PlainLayout,
      redirect: { name: 'Home' },
      children: [{
          path: "/login",
          name: "Login",
          component: () => import("../views/LoginView.vue"),
        },
        {
          path: "/register",
          name: "Register",
          component: () => import("../views/RegisterView.vue"),
        },
        {
          path: "/:slug",
          name: "JobBoard",
          component: () => import("../views/JobBoardView.vue"),
        },
        {
          path: "/:slug/preview",
          name: "JobBoardPreview",
          component: () => import("../views/JobBoardPreviewView.vue"),
        },
        {
          path: "/:slug/:job_slug/preview",
          name: "JobPreview",
          component: () => import("../views/JobPreviewView.vue"),
        },
        {
          path: "/organizations",
          name: "Organizations",
          component: () => import("../views/OrganizationsView.vue"),
        },
        {
          path: "/organizations/new",
          name: "NewOrganization",
          component: () => import("../views/NewOrganizationView.vue"),
        },
        {
          path: "/google",
          name: "GoogleAuth",
          props: true,
          component: () => import("../views/GoogleView.vue"),
        }
      ]
    },
    {
      path: '',
      name: 'AppLayout',
      component: DefaultLayout,
      redirect: { name: 'Home' },
      children: [{
          path: '/',
          name: 'Home',
          component: HomeView,
        },
        {
          path: "/notifications",
          name: "Notification",
          component: () => import("../views/NotificationView.vue"),
        },
        {
          path: "",
          name: "Index",
          component: 'PlainLayout',
          redirect: { name: 'Home' }
        },
        {
          path: "/candidates/new",
          name: "NewCandidate",
          component: () => import("../views/NewCandidateView.vue"),
        },
        {
          path: "/account",
          name: "AccountSetting",
          component: () => import("../views/AccountSettingView.vue"),
          children: [{
              path: 'profile',
              name: 'AccountSettingProfile',
              component: () => import("../views/AccountSettingProfileView.vue"),
            },
            {
              path: 'preferences',
              name: 'AccountSettingPreferences',
              component: () => import("../views/AccountSettingPreferencesView.vue"),
            },
            {
              path: 'security',
              name: 'AccountSettingSecurity',
              component: () => import("../views/AccountSettingSecurityView.vue"),
            },
          ],
        },
        {
          path: "/messages",
          name: "Messages",
          component: () => import("../views/MessagesView.vue"),
        },
        {
          path: "/jobs",
          name: "Jobs",
          component: () => import("../views/JobsView.vue"),
        },
        {
          path: "/applicants",
          name: "Applicants",
          component: () => import("../views/ApplicantsView.vue"),
        },
        {
          path: "/company",
          name: "Company",
          component: () => import("../views/CompanyView.vue"),
        },
        {
          path: "/schedule",
          name: "Schedule",
          component: () => import("../views/ScheduleView.vue"),
        },
        {
          path: "/applicants/:id",
          name: "Applicant",
          component: () => import("../views/ApplicantView.vue"),
          redirect: { name: 'ProfileApplicant' },
          children: [{
              path: 'profile',
              name: 'ProfileApplicant',
              component: () => import("../views/ProfileApplicantView.vue"),
            },
            {
              path: 'resume',
              name: 'ResumeApplicant',
              component: () => import("../views/ResumeApplicantView.vue"),
            },
            {
              path: 'interview',
              name: 'InterviewApplicant',
              component: () => import("../views/InterviewApplicantView.vue"),
            },
            {
              path: 'stage',
              name: 'StageApplicant',
              component: () => import("../views/StagesApplicantView.vue"),
            },
          ]
        },
        {
          path: "/jobs/:slug",
          name: "Job",
          component: () => import("../views/JobView.vue"),
          redirect: { name: 'JobDetails' },
          children: [{
              path: 'details',
              name: 'JobDetails',
              component: () => import("../views/JobDetailsView.vue"),
            },
            {
              path: 'applicants',
              name: 'JobApplicants',
              component: () => import("../views/JobApplicantsView.vue")
            },
            {
              path: 'analytics',
              name: 'JobAnalytics',
              component: () => import("../views/JobAnalyticsView.vue")
            },
          ],
        },
        {
          path: '/jobs/:slug/edit',
          name: 'JobEdit',
          component: () => import("../views/JobEditView.vue")
        },
        {
          path: "/settings",
          name: "Settings",
          component: () => import("../views/SettingView.vue"),

          // children: [{
          //     path: 'jobboard',
          //     name: 'SettingJobBoard',
          //     component: () => import("../views/SettingJobBoardView.vue"),
          //     children: [{
          //         path: 'branding',
          //         name: 'SettingJobBoardBranding',
          //         component: () => import("../views/SettingJobBoardBrandingView.vue"),
          //       },
          //       {
          //         path: 'content',
          //         name: 'SettingJobBoardContent',
          //         component: () => import("../views/SettingJobBoardContentView.vue"),
          //       },
          //       {
          //         path: 'seo',
          //         name: 'SettingJobBoardSeo',
          //         component: () => import("../views/SettingJobBoardSeoView.vue"),
          //       },
          //       {
          //         path: 'navigation',
          //         name: 'SettingJobBoardNavigation',
          //         component: () => import("../views/SettingJobBoardNagigationView.vue"),
          //       },
          //       {
          //         path: 'custom-domain',
          //         name: 'SettingJobBoardCustomDomain',
          //         component: () => import("../views/SettingJobBoardCustomDomainView.vue"),
          //       },

          //     ]
          //   },
          //   {
          //     path: 'organization',
          //     name: 'SettingOrganization',
          //     component: () => import("../views/SettingOrganizationView.vue")
          //   }
          // ],
        },
        {
          path: "/jobs/new",
          name: "NewJob",
          component: () => import("../views/NewJobView.vue"),
        },
      ]
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
  const publicPages = ['/login', '/register', '/google'];
  const authRequired = !publicPages.includes(to.path) && !['JobPreview', 'JobBoardPreview'].includes(to.name)

  const loggedIn = localStorage.getItem('user');
  const authStore = useAuthStore();

  if (authRequired && !loggedIn) {
    next({ name: 'Login' })
    authStore.returnUrl = to.fullPath;
  } else next()
});

export default router;
