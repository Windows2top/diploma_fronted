import { createRouter, createWebHistory } from 'vue-router'

import Main from './components/Main.vue'
import Register from './components/Registration.vue'
import Login from './components/Login.vue'
import UserProfile from './components/UserProfile.vue'
import CurrentTest from './components/CurrentTest.vue'
import CreateTest from './components/CreateTest.vue'
import UpdateTest from './components/UpdateTest.vue'
import PassingTest from './components/PassingTest.vue'
import SiteMap from './components/SiteMap.vue'
import UserHelp from './components/UserHelp.vue'

export default createRouter({
    history:createWebHistory(),
    routes: [{
        path: '/',
        name: 'Main',
        component: Main
    },
    {
        path: '/registration',
        component: Register,
        meta: {hiddenNavBar: true, hiddenMyFooter: true}
    },
    {
        path: '/login',
        component: Login,
        meta: {hiddenNavBar: true, hiddenMyFooter: true}
    },
    {
        path: '/user',
        component: UserProfile,
        children: [
            {
                path: 'create_test',
                name: 'CreateTest',
                component: CreateTest
            }
        ]
    },
    {
        path: '/site_map',
        component: SiteMap
    },
    {
        path: '/help',
        component: UserHelp
    },
    {
        path: '/tests/:id',
        name: 'CurrentTest',
        component: CurrentTest,
        props: route => ({ id: Number(route.params.id) })
    
    },{
        path: '/tests/:id/edit',
        name: 'UpdateTest',
        component: UpdateTest,
        props: true
    }, {
        path: '/tests/:id/questions',
        name: 'PassingTest',
        component: PassingTest,
        props: true 
    }],
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    }
})