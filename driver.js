import webdriver from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
// 작동하고 있는 크롬 드라이버의 포트 "9515"를 사용합니다.
export const driver = new Promise((resolve, reject) => {
	const promiseDriver = new webdriver.Builder()
		.usingServer("http://localhost:9515")
		.withCapabilities({
			chromeOptions: {
				// 여기에 사용중인 Electron 바이너리의 경로를 지정하세요.
				binary: "./node_modules/electron/dist/Electron.app/Contents/MacOS/Electron"
			}
		})
		.forBrowser("chrome")
	  .setChromeOptions(new chrome.Options().headless().windowSize({ width: 1920, height: 1080 }));
	  resolve(promiseDriver);
});
