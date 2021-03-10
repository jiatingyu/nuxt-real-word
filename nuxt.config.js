export default {
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {
            // console.log("---", config);
            // console.log("++", ctx);
        }
    },
    router: {
        // you can overwrite the default Nuxt.js configuration of Vue Router
        extendRoutes(routes, resolve) {
            // routes.length = 0
            routes.splice(0)
            // console.log("---", routes);
            // console.log("++", resolve);
            let myRoutes = [
                {
                    path: '/',
                    name: "",
                    component: resolve(__dirname, "layouts/main.vue"),
                    children: [
                        {
                            path: '',
                            name: 'home',
                            component: resolve(__dirname, "pages/index.vue")
                        }, {
                            name: 'login',
                            path: '/login',
                            component: resolve(__dirname, 'pages/login.vue'),
                        },
                        {
                            name: 'register',
                            path: '/register',
                            component: resolve(__dirname, 'pages/login.vue'),
                        },
                        {
                            name: 'settings',
                            path: '/settings',
                            component: resolve(__dirname, 'pages/settings.vue'),
                        },
                        {
                            name: 'article',
                            path: '/article/:slug',
                            component: resolve(__dirname, 'pages/article.vue')
                        },
                        {
                            name: 'editor',
                            path: '/editor',
                            component: resolve(__dirname, 'pages/createArticle.vue')
                        },
                        {
                            name: 'editorSlug',
                            path: '/editor/:slug',
                            component: resolve(__dirname, 'pages/createArticle.vue')
                        },
                        {
                            name: 'profile',
                            path: '/profile/:username',
                            component: resolve(__dirname, 'pages/profile.vue')
                        }
                    ]
                }
            ]
            routes.push(...myRoutes)
        }
    },
    server: {
        port: 3000, // default: 3000
        host: '0.0.0.0' // default: localhost,
    },
    plugins: [
        '~/plugins/request.js',
        '~/plugins/day.js'
    ]
}