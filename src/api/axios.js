import axios from "axios";
import router from "@/routes/router";

const UNAUTHORIZED = 401;
const HOST = "";

const onUnauthorized = () => {
	delete localStorage.token;
	axios.defaults.headers.common.Authorization = null;
	router.push(`/login?rPath=${encodeURIComponent(location.pathname)}`);
};

export const setAuthInHeader = token => {
	axios.defaults.headers.common.Authorization = token ? `Bearer ${token}` : null;
};
const { token } = localStorage;
if (token) {setAuthInHeader(token);}

export const request = (method, url, data) => {
	return axios({
		method,
		url: url,
		data
	}).then(result => result.data)
		.catch(result => {
			const { status } = result.response;
			if (status === UNAUTHORIZED) {

				onUnauthorized();
			}
			throw result.response;
		});
};
