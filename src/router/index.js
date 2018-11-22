import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'
import StartBook from '@/view/StartBook'
import Build from '@/view/Build'
import MakePlan from '@/view/MakePlan'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta:{txt:'首页'}
    },
    {
      path: '/startbook',
      name: 'StartBook',
      component: StartBook,
      meta:{txt:'组合计划书-启动'}
    },
    {
      path: '/build/:id/:flag',
      name: 'Build',
      component: Build,
      meta:{txt:'组合计划书-生成'}
    },
    {
      path: '/build',
      name: 'build',
      component: Build,
      meta:{txt:'组合计划书-生成'}
    },
    {
      path:'/makeplan',
      name:'MakePlan',
      component:MakePlan,
      meta:{txt:'组合计划书-制作'}
    },
    {
      path:'/makeplan/:id',
      name:'Makeplan',
      component:MakePlan,
      meta:{txt:'组合计划书-制作'}
    }
  ]
})
