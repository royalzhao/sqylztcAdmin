import Vue from 'vue'
import Router from 'vue-router'
import {post,fetch,patch,put} from '@/util/http'
import {delCookie,getCookie} from '@/util/util'

import Home from '@/components/common/Home'
import DashBoard from '@/components/page/DashBoard'
import index from '@/components/page/index'
import websiteScroll from '@/components/page/websiteScroll'
import shopScroll from '@/components/page/shopScroll'
import commonTel from '@/components/page/commonTel'
import doctorsList from '@/components/page/doctorsList'
import healthyZhishi from '@/components/page/healthyZhishi'
import orderList from '@/components/page/orderList'
import addPhone from '@/components/form/addPhone'
import updatePhone from '@/components/form/updatePhone'
import updateScroll from '@/components/form/updateScroll'
import updateWebsiteScroll from '@/components/form/updateWebsiteScroll'
import addScroll from '@/components/form/addScroll'
import addWebsiteScroll from '@/components/form/addWebsiteScroll'
import orderStatistic from '@/components/page/orderStatistic'

import addArticle from '@/components/form/addArticle'
import updateArticle from '@/components/form/updateArticle'
import updatePassword from '@/components/form/updatePassword'
import report from '@/components/page/report'
import contact from '@/components/page/contact'
import awardSetting from '@/components/page/awardSetting'
import addDoctor from '@/components/form/addDoctor'
import updateDoctor from '@/components/form/updateDoctor'
import awardGet from '@/components/page/awardGet'
import AwardStatistic from '@/components/page/AwardStatistic'



import healthyToutiao from '@/components/page/healthyToutiao'





Vue.use(Router)

const routes = [
    {
      path: '/sqztcAdmin/index',
      name:'登录',
      component:index
    },
    {
      path: '/sqztcAdmin',
      component: Home,
      redirect: '/sqztcAdmin/DashBoard',
      children:[
        {
          path:'/sqztcAdmin/DashBoard',
          component:DashBoard
        },{
          path:'/sqztcAdmin/websiteScroll',
          component:websiteScroll
        },{
          path:'/sqztcAdmin/shopScroll',
          component:shopScroll
        },{
          path:'/sqztcAdmin/commonTel',
          component:commonTel
        },{
          path:'/sqztcAdmin/doctorsList',
          component:doctorsList
        },{
          path:'/sqztcAdmin/healthyZhishi',
          component:healthyZhishi
        },{
          path:'/sqztcAdmin/orderList',
          component:orderList
        },{
          path:'/sqztcAdmin/addPhone',
          component:addPhone
        },{
          path:'/sqztcAdmin/updatePhone',
          component:updatePhone
        },{
          path:'/sqztcAdmin/updateScroll',
          component:updateScroll
        },{
          path:'/sqztcAdmin/updateWebsiteScroll',
          component:updateWebsiteScroll
        },{
          path:'/sqztcAdmin/addScroll',
          component:addScroll
        },{
          path:'/sqztcAdmin/addWebsiteScroll',
          component:addWebsiteScroll
        },{
          path:'/sqztcAdmin/orderStatistic',
          component:orderStatistic
        },{
          path:'/sqztcAdmin/healthyToutiao',
          component:healthyToutiao
        },{
          path:'/sqztcAdmin/addArticle',
          component:addArticle
        },{
          path:'/sqztcAdmin/updateArticle',
          component:updateArticle
        },{
          path:'/sqztcAdmin/updatePassword',
          component:updatePassword
        },{
          path:'/sqztcAdmin/report',
          component:report
        },{
          path:'/sqztcAdmin/awardSetting',
          component:awardSetting
        },{
          path:'/sqztcAdmin/addDoctor',
          component:addDoctor
        },{
          path:'/sqztcAdmin/updateDoctor',
          component:updateDoctor
        },{
          path:'/sqztcAdmin/awardGet',
          component:awardGet
        },{
          path:'/sqztcAdmin/AwardStatistic',
          component:AwardStatistic
        },{
          path:'/sqztcAdmin/contact',
          component:contact
        }

      ]
    }
  ];
const router = new Router({
  mode: 'history',
  routes
});
//这个是请求页面路由的时候会验证cookie存不存在，不存在的话会到登录页
router.beforeEach((to, from, next) => {
    if (to.path.startsWith('/sqztcAdmin/index')) {
      delCookie('admin_user');
      delCookie('id');
      next()
    } else {
      let user = getCookie('admin_user');
      if (!user) {
        next({path: '/sqztcAdmin/index'})
      } else {
        next()
      }
    }

});
export default router;

