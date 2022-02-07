const config = {
	namespaced: true,
	state: {
		directory: "",
		server_url: "",
		cookie: "",
		domain: ".imqa.io",
		path: "/",
		secure: false
	},
	mutations: {
		setDirectory(state, payload) {
			state.directory = payload;
		},
		setServerUrl(state, payload) {
			state.server_url = payload;
		},
		setCookie(state, payload) {
			state.cookie = payload;
		}
	},
	actions: {
		setDirectory({ commit }, payload) {
			commit("setDirectory", payload);
		},
		setServerUrl({ commit }, payload) {
			commit("setServerUrl", payload);
		},
		setCookie({ commit }, payload) {
			commit("setCookie", payload);
		}
	},
	getters: {

	}
};

export default config;
