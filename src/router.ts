import { createRouter, createWebHistory } from "vue-router";
import Style from "./views/StyleView.vue";
import Home from "./views/HomeView.vue";
import TablesView from  './views/TablesView.vue'
import FormsViewVue from './views/FormsView.vue';
import ProfileView from './views/ProfileView.vue';
import UiView from './views/UiView.vue'
import ResponsiveView from './views/ResponsiveView.vue'
import LoginView from './views/LoginView.vue'
import ErrorView from './views/ErrorView.vue'
import SignInView from './views/SignIn.vue'
import SignUpView from './views/SignUp.vue'
import BookListView from './views/BookList.vue'
import BookDetailVue from "./views/BookDetail.vue";
import LongTaskDetail  from "./views/LongTaskDetail.vue";
import DailyTaskDetailVue from "./views/DailyTaskDetail.vue";
// import QuestionDetail from './views/QuestionDetail.vue'
import DailyTaskResult from './views/DailyTaskResult.vue';
import QuestionDetail from './views/QuestionDetailTest.vue'
// import DailyTaskResult from './views/DailyTaskResultTest.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
        meta: {title: "Select style",},
        path: '/',
        component: Style,
    },
    {
        // Document title tag
        // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
        meta: {title: "Dashboard",},
        path: '/dashboard',
        component: Home,
    },
    {
        meta: {title: "Tables",},
        path: '/tables',
        component: TablesView,
    },
    {
        meta: {title: "Forms",},
        path: "/forms",
        name: "forms",
        component: FormsViewVue,
    },
    {
        meta: {title: "Profile",},
        path: '/profile',
        component: ProfileView,
    },
    {
        meta: {title: "Ui",},
        path: '/ui',
        component: UiView,
    },
    {
        meta: {title: "Responsive layout",},
        path: '/responsive',
        component: ResponsiveView,
    },
    {
        meta: {title: "Login",},
        path: '/login',
        component: LoginView,
    },
    {
        meta: {title: "Error",},
        path: '/error',
        component: ErrorView,
    },
    {
        meta: {title: "Sign-In",},
        path: '/sign-in',
        component: SignInView,
    },
    {
        meta: {title: "Sign-Up",},
        path: '/sign-up',
        component: SignUpView,
    },
    {
        meta: {title: "Book List",},
        path: '/book-list',
        component: BookListView,
    },
    {
        meta: {title: "Book BookDetail Page",},
        path: '/books/:id',
        component: BookDetailVue,
        props: true
    },
    {
        meta: {title: "User Long Task Detail Page",},
        path: '/longTasks/:id',
        component: LongTaskDetail,
        props: true
    },
    {
        meta: {title: "User Daily Task Detail Page",},
        path: '/dailytasks/:id',
        component: DailyTaskDetailVue,
        props: true
    },
    {
        meta: {title: "Question Detail Page",},
        path: '/questions/:id',
        component: QuestionDetail,
        props: true
    },
    {   
        meta: {title: "Answer Result Page",},
        path: '/dailytasks/:id/result',
        component: DailyTaskResult ,
        props: true
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.beforeEach((to, from) => {

  scroll(0, 0)

  return true
})

export default router;
