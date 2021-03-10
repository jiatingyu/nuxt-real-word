import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5b110cca = () => interopDefault(import('..\\layouts\\main.vue' /* webpackChunkName: "" */))
const _04fe9476 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "" */))
const _62b390e6 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "" */))
const _44cf67af = () => interopDefault(import('..\\pages\\settings.vue' /* webpackChunkName: "" */))
const _415d98cc = () => interopDefault(import('..\\pages\\article.vue' /* webpackChunkName: "" */))
const _3ea78bfe = () => interopDefault(import('..\\pages\\createArticle.vue' /* webpackChunkName: "" */))
const _8db94266 = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _5b110cca,
    children: [{
      path: "",
      component: _04fe9476,
      name: "home"
    }, {
      path: "/login",
      component: _62b390e6,
      name: "login"
    }, {
      path: "/register",
      component: _62b390e6,
      name: "register"
    }, {
      path: "/settings",
      component: _44cf67af,
      name: "settings"
    }, {
      path: "/article/:slug",
      component: _415d98cc,
      name: "article"
    }, {
      path: "/editor",
      component: _3ea78bfe,
      name: "editor"
    }, {
      path: "/editor/:slug",
      component: _3ea78bfe,
      name: "editorSlug"
    }, {
      path: "/profile/:username",
      component: _8db94266,
      name: "profile"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
