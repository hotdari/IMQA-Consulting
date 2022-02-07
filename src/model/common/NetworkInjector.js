import config, { DEFAULT_NETWORK_TYPE } from "@/config/config";

export class NetworkInjector{
	inject(model, apiName, networkType = DEFAULT_NETWORK_TYPE) {
		const result = config[model][apiName][networkType].inject;
		result.setConfig(this.injectApi(model, apiName, networkType));
		return result;
	}

	injectApi(model, apiName, networkType){
		return config[model][apiName][networkType].api;
	}
};
