import { ipcMain } from "electron";
import axios from "axios";
import { getLoginCookies } from "../../src/util/cookie";
import selenium from "../Selenium";

export function login(){
	ipcMain.on("loginBtn", function (event, arg) {
		console.log(arg);
		axios
			.post("http://ote.imqa.io/api/user/" + arg.id, { username: arg.id, password: arg.password })
			.then(res => {
				event.reply("loginBtn-reply", getLoginCookies(res.headers["set-cookie"][0]));
			})
			.catch(err => event.reply("loginBtn-reply", { massage: "error", error: err }));
	});
}

