import { Observable } from "rxjs";
import { NetworkInjector } from "@/model/common/NetworkInjector";

export default {
	login: function (config = {}){
		config.apiName = "login";
		const subscribers = new NetworkInjector().inject("user", config.apiName);
		return new Observable(subscriber => {
			subscribers.request(config, subscriber);
		});
	}
};
