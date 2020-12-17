import Vue from 'vue';
import '@/style/index.less'
import '@/config/global'
import '@/icons'
import waves from '@/directives/waves'
import api from '@/api'

Vue.use(waves, {
  duration: 500,
  delay: 100
})
Vue.prototype.$api = api

<%_ if (options.vuex) { _%>
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    
  },
  mutations: {
    
  }
});
<%_ } _%>

<%_ if (options.router) { _%>
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const Foo = { template: '<div>foo</div>' }
const routes = [
  { path: '/foo', component: Foo }
]
const router = new VueRouter({
  routes
})
<%_ } _%>

import App from './App.vue';
new Vue({
  <%_ if (options.vuex) { _%>
    store,
  <%_ } _%>
  <%_ if (options.router) { _%>
    router,
  <%_ } _%>
  render: h => h(App),
}).$mount('#app');
