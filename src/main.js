import Vue from 'vue';
import App from './App';

// import 'src/styles/index.scss'; //global css

Vue.config.productionTip = false;
const app = new Vue(App);
app.$mount();
