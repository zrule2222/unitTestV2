import Vue from 'vue'
import VueRouter from 'vue-router'
import postPage from '../views/PostPage.vue'
import Page404 from '../views/404page.vue'
import ArticleView from '../views/ArticleView.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegistrationPage.vue'
import axios from 'axios';
// import babelPolyfill from 'babel-polyfill'



Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: "Home",
            component: LoginPage,
            props: true
        },
        {
            path: '/posts',
            name: "Posts",
            component: postPage,
            meta: { requiresAuth: true }

        },
        {
            path: '/registration',
            name: "Registration",
            component: RegisterPage
        },
        {
            path: '/404',
            name: "NotFound",
            component: Page404
        },
        {
            path: '/articles/:id',
            name: "SpesificArticle",
            component: ArticleView,
            beforeEnter: async (to, from, next) => {

                try {
                    const response = await axios.get(`http://127.0.0.1:5022/api/article/${to.params.id}`)
                    if (response.status == 200) {
                        next()
                    }
                }
                catch (error) {
                    next('/404')
                }
            }
        },
        {
            path: '*',
            name: "InvalidLink",
            component: Page404
        },

    ]
})
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if (localStorage.getItem("token") == null) {
            next({
                path: "/",
            });
        }
        else {
            next();
        }
    } else {
        next();
    }
});

export default router