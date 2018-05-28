import Vue from 'vue'
import Router from 'vue-router'
//引入相关组件
import Login from '@/components/Login/index.vue'
import Home from '@/components/Home/index.vue'
import NotFound from '@/components/NotFound/index.vue'
import SetMap from '@/components/SetMap/index.vue'

Vue.use(Router)

//路由配置信息
export default new Router({
    routes: [{
        path: '/home',
        name: 'home',
        component: Home,
        children: [{
            path: "quanbu",
            name: "quanbu",
            component: SetMap
        }, {
            path: "freshWater",
            name: "freshWater",
            meta: '/freshwater/listFreshwater',
            component: SetMap
        }, {
            path: "air",
            name: "air",
            meta: '/air/getAllCitys',
            component: SetMap
        }, {
            path: "seaWater",
            name: "seaWater",
            meta: '/seawater/listSeaWater',
            component: SetMap
        }, {
            path: "letOut",
            name: "letOut",
            meta: '/companyMap/listMap',
            component: SetMap
        }, {
            path: "soil",
            name: "soil",
            component: SetMap
        }, {
            path: "radiation",
            name: "radiation",
            component: SetMap
        }, {
            path: "noise",
            name: "noise",
            component: SetMap
        }, {
            path: "freshCrude",
            name: "freshCrude",
            meta: '/huifresh/list',
            component: SetMap
        }, {
            path: "cultivation",
            name: "cultivation",
            meta: '/huiYun/listMap',
            component: SetMap
        }, {
            path: "car",
            name: "car",
            meta: '/engine/getjsons',
            component: SetMap
        }, {
            path: "ship",
            name: "ship",
            component: SetMap
        }, {
            path: "business",
            name: "business",
            component: SetMap
        }, {
            path: "common",
            name: "common",
            component: SetMap
        }, {
            path: "culture",
            name: "culture",
            component: SetMap
        }, {
            path: "screenage",
            name: "screenage",
            meta: '/medical/listmap',
            component: SetMap
        }, {
            path: "biochemistry",
            name: "biochemistry",
            component: SetMap
        }, {
            path: "guangxi",
            name: "guangxi",
            meta: '/guangxi/list',
            component: SetMap
        }, {
            path: "department",
            name: "department",
            component: SetMap
        }, {
            path: "weining",
            name: "weining",
            meta: '/company/list',
            component: SetMap
        }, {
            path: "",
            redirect: "quanbu"
        }]
    }, {
        path: '/',
        name: 'Login',
        component: Login,
    }, {
        path: '*',
        name: "NotFound",
        component: NotFound
    }]
})