import { UserAxiosSubscriber } from "../model/user/UserAxiosSubscriber";

export const DEFAULT_NETWORK_TYPE = "axios";
export const DEFAULT_BASE_URL = "http://ote-account.imqa.io/api";

export default {
	user: {
		login: {
			axios: {
				inject: new UserAxiosSubscriber(),
				api: {
					method: "post",
					init_url: `${DEFAULT_BASE_URL}/user/:user_id`,
					url: `${DEFAULT_BASE_URL}/user/:user_id`
				}
			}
		}
	}
	// selenium: {
	// 	screenshotAction: {
	// 		axios: {
	// 			inject: new UserAxiosSubscriber(),
	// 			api: {
	// 				method: "get",
	// 				init_url: "/init-data",
	// 				url: "/init-data"
	// 			}
	// 		},
	// 		demo: {
	// 			inject: new UserDemoSubscriber(),
	// 			api: {
	// 				method: "get",
	// 				url: "/demo/account/user/get.user.json"
	// 			}
	// 		}
	// 	}
	// }
};
