// 파일 디렉토리
import { dialog, ipcMain } from "electron";

export function directory() {
	ipcMain.on("open-directory-dialog", event => {
		console.log("open-directory-dialog");
		dialog.showOpenDialog(
			{
				properties: ["openDirectory"]
			}).then(result => {
			console.log("open-directory-dialog-reply", result);
			event.reply("open-directory-dialog-reply", result);
		});
	});
}

