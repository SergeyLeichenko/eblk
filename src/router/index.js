import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import Tree from "../views/Tree.vue";
import Terms from "../views/Terms.vue";
import NoLink from "../views/NoLink.vue";
import KpiList from "../views/KpiList.vue";
import {authGuard} from "../auth";
import VueLogger from "vuejs-logger";
import NProgress from 'nprogress'
import store from '../store/store'
import NotFound from '../views/NotFound.vue'
import NetworkIssue from '../views/NetworkIssue.vue'
import KpiDetails from '../views/KpiDetails.vue'

const isProduction = process.env.NODE_ENV === 'production';

const options = {
    isEnabled: true,
    logLevel: isProduction ? 'error' : 'debug',
    stringifyArguments: false,
    showLogLevel: true,
    showMethodName: true,
    separator: '|',
    showConsoleColors: true
};

Vue.use(Router, VueLogger, options);

const router = new Router({
    mode: "history",
    base: "/v2/",
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/profile",
            name: "profile",
            component: Profile,
            beforeEnter: authGuard
        },
        {
            path: "/tree",
            name: "tree",
            component: Tree,
            beforeEnter: authGuard
        },
        {
            path: "/terms",
            name: "terms",
            component: Terms,
            beforeEnter: authGuard
        },
        {
            path: "/no-link",
            name: "no-link",
            component: NoLink
        },
        {
            path: "/kpi-list",
            name: "kpi-list",
            component: KpiList,
            beforeEnter(routeTo, routeFrom, next) {
                authGuard(routeTo, routeFrom, next)
                store.dispatch('kpi/loadKpis').then(() => {
                    next()
                }).catch(error => {
                    if (error.response && error.response.status === 404) {
                        next({ name: '404', params: { resource: 'kpi list' } })
                    } else {
                        next({ name: 'network-issue' })
                    }
                })
            }
        },
        {
            path: "/kpi/:id",
            name: "kpi-details",
            component: KpiDetails,
            beforeEnter(routeTo, routeFrom, next) {
                authGuard(routeTo, routeFrom, next)
                store.dispatch('value/loadValues', routeTo.params.id)
                    .then(() => {
                        next()
                    })
                    .catch(error => {
                        if (error.response && error.response.status === 400) {
                            next({ name: '404', params: { resource: 'kpi details' } })
                        } else {
                            next({ name: 'network-issue' })
                        }
                    })
            }
        },
        {
            path: '/404',
            name: '404',
            component: NotFound,
            props: true
        },
        {
            path: '/network-issue',
            name: 'network-issue',
            component: NetworkIssue
        },
        {
            path: '*',
            redirect: { name: '404', params: { resource: 'page' } }
        }
    ]
});

router.beforeEach((routeTo, routeFrom, next) => {
    NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done()
})

export default router;
