import webdriver from "selenium-webdriver";


export const driver = new webdriver.Builder()
// 작동하고 있는 크롬 드라이버의 포트 "9515"를 사용합니다.
	.usingServer("http://localhost:9515")
	.withCapabilities({
		chromeOptions: {
			// 여기에 사용중인 Electron 바이너리의 경로를 지정하세요.
			binary: "./node_modules/electron/dist/Electron.app/Contents/MacOS/Electron"
		}
	})
	.forBrowser("chrome")
	.build();
