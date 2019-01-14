import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'

import HelloWorld from '@/components/HelloWorld'
import HelloVue from '@/components/vueExample/HelloVue'
import BindMessage from '@/components/vueExample/BindMessage'
import ConditionalRendering from '@/components/vueExample/ConditionalRendering'
import ListRendering from '@/components/vueExample/ListRendering'
import EventHandling from '@/components/vueExample/EventHandling'
import FormInputBindings from '@/components/vueExample/FormInputBindings'
import ComponentG from '@/components/vueExample/ComponentG'
import ComponentL from '@/components/vueExample/ComponentL'
import Render from '@/components/test/Render'
import DataTableDemo from '@/components/demo/DataTableDemo'

var pages = [
  HelloWorld,
  HelloVue,
  BindMessage,
  ConditionalRendering,
  ListRendering,
  EventHandling,
  FormInputBindings,
  ComponentG,
  ComponentL,
  Render,
  DataTableDemo
]
var routerData = []
var menu = []
var menuParent = []
for (var i in pages) {
  // src/components/HelloWorld.vue
  var srcFile = 'src/components'
  var srcPath = pages[i].__file.replace(srcFile, '').replace('.vue', '')
  var name = srcPath.substr(srcPath.lastIndexOf('/') + 1, srcPath.length)
  routerData.push({
    name: name,
    path: srcPath, // '/' + pages[i].name
    component: pages[i]
  })
  var itemParents = srcPath.split('/') // 查看有幾個階層
  itemParents.splice(0, 1) // 刪除空的首項
  var itemP = 'noparent'
  while (itemParents.length !== 0) {
    if (itemParents.length === 1) {
      if (itemP === 'noparent') {
        menu.push({
          name: name,
          path: srcPath
        })
      } else {
        menu.find(function (element) {
          return element['name'] === itemP
        }).dropdown.push({
          name: name,
          path: srcPath
        })
      }
    } else {
      if (menuParent.indexOf(itemParents[0]) === -1) {
        if (itemP === 'noparent') {
          menu.push({
            name: itemParents[0],
            dropdown: []
          })
        } else {
          menu.find(function (element) {
            return element['name'] === itemP
          }).dropdown.push({
            name: itemParents[0],
            dropdown: []
          })
        }
        menuParent.push(itemParents[0])
      }
      itemP = itemParents[0]
    }
    itemParents.splice(0, 1) // 填完資料後刪除元素
  }
}

store.dispatch('upDateMenu', menu)
Vue.use(Router)
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
export default new Router({
  routes: routerData
})
