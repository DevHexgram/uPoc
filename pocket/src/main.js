import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {
    Tab,
    Tabs,
    SwipeCell,
    Cell,
    CellGroup,
    Button,
    Calendar,
    Sticky,
    Popup,
    Icon,
    Field,
    NumberKeyboard,
    Form,
    Picker,
    Grid,
    GridItem,
    Image,
    Tabbar,
    TabbarItem,
} from 'vant';

// Vue.use(mlf);

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(SwipeCell);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Button);
Vue.use(Calendar);
Vue.use(Sticky);
Vue.use(Popup);
Vue.use(Icon);
Vue.use(Field);
Vue.use(NumberKeyboard);
Vue.use(Form);
Vue.use(Picker);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Image);
Vue.use(Tabbar);
Vue.use(TabbarItem);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
