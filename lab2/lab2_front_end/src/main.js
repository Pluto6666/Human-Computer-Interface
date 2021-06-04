// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { MessageBox } from 'element-ui'
import { Button, Form, FormItem, Input, Message, Container, Header, Aside, Main,
Menu, Submenu, MenuItemGroup, MenuItem } from 'element-ui'
import axios from 'axios'
axios.defaults.withCredentials = true;
import VueAxios from 'vue-axios'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
