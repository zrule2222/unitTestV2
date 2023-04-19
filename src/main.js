import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import articles from './Services/articleService.js'

Vue.use(articles)


// new Vue({
//   el: '#app',
//   router,
//   render: h => h(App)
// })

new Vue({
  render: (h) => h(App),
  router
}).$mount('#app');
