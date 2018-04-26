import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


  const  routes=[
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/basetable',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                },
                {
                    path: '/vuetable',
                    component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/baseform',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                },
                {
                    path: '/vueeditor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/basecharts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-schart组件
                },
                {
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/amm',
                    component: resolve => require(['../components/page/Ats.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/button',
                    component: resolve => require(['../components/page/Button.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/collpase',
                    component: resolve => require(['../components/page/Collpas.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/carousel',
                    component: resolve => require(['../components/page/Carousel.vue'], resolve)    // 拖拽列表组件
                }
                ,
                {
                    path: '/card',
                    meta: { requiresAuth: true },
                    component: resolve => require(['../components/page/Card.vue'], resolve),
                },
                {
                    path: '/collection',
                    meta: { requiresAuth: true },
                    component: resolve => require(['../components/page/CollectionTask.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/log',
                    meta: { requiresAuth: true },
                    component: resolve => require(['../components/page/LogCollection.vue'], resolve)    // 拖拽列表组件
                },{
                    path: '/tableCont',
                    meta: { requiresAuth: true },
                    name:'tableCont',
                    component: resolve => require(['../components/page/TableCont.vue'], resolve)    // 拖拽列表组件
                },{
                    path: '/logDetail',
                    meta: { requiresAuth: true },
                    name:'logDetail',
                    component: resolve => require(['../components/page/LogDetail.vue'], resolve)    // 拖拽列表组件
                },{
                    path: '/updateLog',
                    meta: { requiresAuth: true },
                    name:'updateLog',
                    component: resolve => require(['../components/page/UpdateLog.vue'], resolve)    // 拖拽列表组件
                }

            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]



const router = new Router({
    routes
});

// 全局导航钩子
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        let username = localStorage.getItem('ms_username');
        console.log(username);
        if(!isEmptyObject(username)) {
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
});


function isEmptyObject(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}
//判断object是否为空


export default router;