import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import HelloVue from '@/components/vueExample/HelloVue'
import BindMessage from '@/components/vueExample/BindMessage'
import ConditionalRendering from '@/components/vueExample/ConditionalRendering'
import ListRendering from '@/components/vueExample/ListRendering'
import EventHandling from '@/components/vueExample/EventHandling'
import FormInputBindings from '@/components/vueExample/FormInputBindings'
import ComponentG from '@/components/vueExample/ComponentG'
import Component from '@/components/vueExample/Component'
import Render from '@/components/test/Render'

Vue.use(Router)
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/HelloVue',
    name: 'HelloVue',
    component: HelloVue
  },
  {
    path: '/BindMessage',
    name: 'BindMessage',
    component: BindMessage
  },
  {
    path: '/ConditionalRendering',
    name: 'ConditionalRendering',
    component: ConditionalRendering
  },
  {
    path: '/ListRendering',
    name: 'ListRendering',
    component: ListRendering
  },
  {
    path: '/EventHandling',
    name: 'EventHandling',
    component: EventHandling
  },
  {
    path: '/FormInputBindings',
    name: 'FormInputBindings',
    component: FormInputBindings
  },
  {
    path: '/ComponentG',
    name: 'ComponentG',
    component: ComponentG
  },
  {
    path: '/Component',
    name: 'Component',
    component: Component
  },
  {
    path: '/Render',
    name: 'Render',
    component: Render
  }
  ]
})
