import { ipcMain } from "electron";
import axios from "axios";

export function appVersion(){
	ipcMain.on("appversionLoad", function (event, arg) {
		axios
			.get(" http://ote-mpm.imqa.io/api/project/32/version")
			.then(res => {
				event.reply("appversionLoad-reply", res.data);
			})
			.catch(err => event.reply("loginBtn-reply", { massage: "error", error: err }));
	});
}
