import axios from "axios";
import { CommonSubscriber } from "@/model/common/CommonSubscriber";

export class AxiosSubscriber extends CommonSubscriber {
	configMashaller(config = {}) {
		const params = config.params;
		const data = config.data;
		const _config = super.getConfig();
		_config.params = params;
		_config.data = data;
		return _config;
	}

	responseMashaller(res) {
		return res;
	}

	subscribeRequestAction(config, subscriber) {
		console.log("adsfasdf:::", config);
		return axios(config)
			.then(res=>{
				subscriber.next(this.responseMashaller(res));
			}).catch(err=>{
				subscriber.error(err);
			});
	}
}

export function request(config, subscriber) {
	return (new AxiosSubscriber).request(config, subscriber);
}
