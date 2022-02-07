import { AxiosSubscriber } from "@/model/common/AxiosSubscriber";

export class UserAxiosSubscriber extends AxiosSubscriber {
	configMashaller(config = {}) {
		const _config = config;
		config = this.getConfig();
		config.url = config.init_url;
		config.url = config.url.replace(":user_id", _config.id);
		config.data = { username: _config.id, password: _config.password };
		config.withCredentials = true;
		return config;
	}
	responseMashaller(res) {
		return res;
	}
}
