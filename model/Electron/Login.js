import { ipcMain } from "electron";
import axios from "axios";
import { setCookie } from "../../src/util/cookie";

export function login(){
	ipcMain.on("loginBtn", function (event, arg) {
		axios
			.post("http://ote.imqa.io/api/user/admin@imqa.io", { username: "admin@imqa.io", password: "djslzja0080" }, { withCredentials: true })
			.then(res => {
				// After successful login, get the set cookie
				console.log(res.headers["set-cookie"]);
				setCookie("tesdst", res.headers["set-cookie"]);
				// Send login task finished event
			})
			.catch(err => console.log(err));
	});
}

