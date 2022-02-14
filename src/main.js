import Vue from "vue";
import DashboardPlugin from "./plugins/dashboard-plugin";
import App from "./App.vue";

// router setup
import router from "./routes/router";

import store from "./store";
import {ActionViewContext} from "@/layer/common/ActionViewContext";

// plugin setup
Vue.use(DashboardPlugin);

let context = ActionViewContext.getInstance();
context.setVue(new Vue());

/* eslint-disable no-new */
new Vue({
	el: "#app",
	render: h => h(App),
	store,
	router
});
