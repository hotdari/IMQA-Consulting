import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/modules/user";
import chat from "@/store/modules/chat";
import config from "@/store/modules/config";


Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		config,
		chat
	}
});

