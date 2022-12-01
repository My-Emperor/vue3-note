import {createRouter, createWebHashHistory} from "vue-router";

const router = createRouter({
    history:createWebHashHistory(),//h5 hash模式
    //映射关系:path - > component
    routes:[
        {
            path:'/',
            redirect:'/home'
        },
        {
            path:'/home',
            component:() => import("@/views/home/home.vue")
        },
        {
            path:'/favor',
            component:() => import("@/views/favor/favor.vue")
        },
        {
            path:'/order',
            component:() => import("@/views/order/order.vue")
        },
        {
            path:'/message',
            component:() => import("@/views/message/message.vue")
        },

    ]
})

export default router;