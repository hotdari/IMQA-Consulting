export class CommonSubscriber {
	getConfig() {
		return this.config;
	}

	setConfig(config) {
		this.config = config;
	}

	//template method pattern
	request(config, subscriber) {
		return this.subscribeRequestAction(this.configMashaller(config), subscriber).then(()=>{
			subscriber.complete();
		});
	}

	configMashaller(config) {
		//do override method
		return config;
	}

	subscribeRequestAction() {
		//do override method
	}
}
