import { CommonSubscriber } from "@/model/common/CommonSubscriber";

export class SeleniumSubscriber extends CommonSubscriber {
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

	subscribeRequestAction() {
		//do override method
	}
}
