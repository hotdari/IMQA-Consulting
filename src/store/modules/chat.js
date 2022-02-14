const user = {
	namespaced: true,
	state: {
		messages: []
	},
	mutations: {
		setMessages(state, payload) {
			state.messages = payload;
		}
	},
	actions: {
		setMessages({ commit }, payload) {
			commit("setMessages", payload);
		}
	},
	getters: {

	}
};

export default user;
