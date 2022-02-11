import { ipcMain } from "electron";
import axios from "axios";
import { getLoginCookies } from "../../src/util/cookie";
import selenium from "../Selenium";
import axiosModel from "../AxiosModel";

export function login(){
	ipcMain.on("loginBtn", function (event, arg) {
		console.log(arg);
		axiosModel
			.post("http://ote.imqa.io/api/user/" + arg.id, { username: arg.id, password: arg.password }, { withCredentials: true })
			.then(res => {
				event.reply("loginBtn-reply", getLoginCookies(res.headers["set-cookie"][0]));
				axiosModel.defaults.headers.common.Authorization = getLoginCookies(res.headers["set-cookie"][0]).value;
			})
			.catch(err => event.reply("loginBtn-reply", { massage: "error", error: err }));
	});
}

