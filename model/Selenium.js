// 웹드라이브
import { driver } from "../driver";

// selenium 웹드라이브
import webdriver from "selenium-webdriver";
import fs from "fs";

class Selenium {
	constructor(driver, driver_config) {
		this._driver = driver;
		this._driver_config = driver_config;
		this._webDriver = null;
	}

	connect(target_url, driver_config = this._driver_config){
		 this._webDriver = this._driver.then(resolve => resolve.build())
			.then(async resolve => {
				await resolve.get(driver_config.server_url);
				await resolve.manage().addCookie(driver_config.cookie);
				await resolve.get(target_url);
				return resolve;
			});
		return this;
	}

	// 스크린샷 생성
	createScreenshot(screenshot_config){
		this._webDriver.then(async resolve => {
			// selenium screenshot action
			await resolve.wait(webdriver.until.elementLocated(webdriver.By.css(screenshot_config.wait_target)), screenshot_config.max_wait_time);
			await resolve.sleep(parseInt(screenshot_config.max_wait_time));
			await resolve.findElement(webdriver.By.css(screenshot_config.screenshot_target)).takeScreenshot().then(img => {
				fs.writeFile(`${screenshot_config.screenshot_image_name}.png`, img, "base64", err => {
					// In case of a error throw err.
					if (err) {throw err;}
				});
			});
			await resolve.quit();
		})
			.catch(err => {
				throw console.error("[createScreenshot] error :: " + err);
			})
			.finally(()=>{
				console.log("[createScreenshot] complate");
			});
	}

	// 드래그 후 스크린샷 생성
	createDragScreenshot(drag_config, screenshot_config){
		this._webDriver.then(async resolve => {
			await resolve.wait(webdriver.until.elementLocated(webdriver.By.css(drag_config.wait_target)), drag_config.max_wait_time);
			await resolve.sleep(drag_config.max_wait_time);

			// selenium Drag element
			const targetElement = await resolve.findElement(webdriver.By.css(drag_config.drag_start_target));
			const startOffset = await targetElement.getRect();
			const endTargetElement = await resolve.findElement(webdriver.By.css(drag_config.drag_end_target));
			const endOffset = await endTargetElement.getRect();

			// selenium Drag action
			const actions = await resolve.actions();
			await actions.move({ x: parseInt(startOffset.x), y: parseInt(startOffset.y) }).press().move({ x: parseInt(endOffset.width + endOffset.x), y: parseInt(endOffset.height + endOffset.y) }).release().perform();

			// selenium screenshot action
			await resolve.wait(webdriver.until.elementLocated(webdriver.By.css(screenshot_config.wait_target)), screenshot_config.max_wait_time);
			await resolve.sleep(screenshot_config.max_wait_time);
			await resolve.findElement(webdriver.By.css(screenshot_config.screenshot_target)).takeScreenshot().then(img => {
				fs.writeFile(`${screenshot_config.screenshot_image_name}.png`, img, "base64", err => {
					// In case of a error throw err.
					if (err) {throw err;}
				});
			});
			await resolve.quit();
		})
			.catch(err => {
				throw console.error("[createDragScreenshot] error :: " + err);
			})
			.finally(()=>{
				console.log("[createDragScreenshot] complate");
			});
	};

	// 드래그 이후 팝업 스크린샷 생성
	createDragPopupScreenshot(target_url, drag_config, screenshot_config) {
		this._webDriver.then(async resolve => {
			await resolve.wait(webdriver.until.elementLocated(webdriver.By.css(drag_config.wait_target)), drag_config.max_wait_time);
			await resolve.sleep(drag_config.max_wait_time);

			// selenium Drag element
			const targetElement = await resolve.findElement(webdriver.By.css(drag_config.drag_start_target));
			const startOffset = await targetElement.getRect();
			const endTargetElement = await resolve.findElement(webdriver.By.css(drag_config.drag_end_target));
			const endOffset = await endTargetElement.getRect();

			// selenium Drag action
			const actions = await resolve.actions();
			await actions.move({ x: parseInt(startOffset.x) - 5, y: parseInt(startOffset.y) }).press().move({ x: parseInt(endOffset.width + endOffset.x), y: parseInt(endOffset.height + endOffset.y) }).release().perform();

			await resolve.sleep(2000);

			// selenium new window action
			const originalWindow = await resolve.getWindowHandle();
			const windows = await resolve.getAllWindowHandles();

			// selenium new window switching
			if(windows.length >= 1){
				windows.forEach(async handle => {
					if (handle !== originalWindow) {
						await resolve.switchTo().window(handle);
					}
				});
			}

			// selenium screenshot action
			await resolve.sleep(screenshot_config.max_wait_time);
			await resolve.wait(webdriver.until.elementLocated(webdriver.By.className(screenshot_config.wait_target)), screenshot_config.max_wait_time);
			await resolve.sleep(screenshot_config.max_wait_time);
			await resolve.findElement(webdriver.By.className(screenshot_config.screenshot_target_class)).takeScreenshot().then(img => {
				fs.writeFile(`${screenshot_config.screenshot_image_name}.png`, img, "base64", err => {
					// In case of a error throw err.
					if (err) {throw err;}
				});
			});
			await resolve.quit();
		})
			.catch(err => {
				throw console.error("[createDragPopupScreenshot] error :: " + err);
			})
			.finally(()=>{
				console.log("[createDragPopupScreenshot] complate");
			});
	}

	// 클릭 이후 스크린샷 생성
	createClickScreenshot(click_target, screenshot_config){
		this._webDriver.then(async resolve => {
			await resolve.wait(webdriver.until.elementLocated(webdriver.By.css(screenshot_config.wait_target)), screenshot_config.max_wait_time);
			await resolve.sleep(screenshot_config.max_wait_time);

			// selenium click element
			const targetElement = await resolve.findElement(webdriver.By.css(click_target));

			// selenium click action
			const actions = await resolve.actions();
			await actions.move({ origin: targetElement }).press().pause(1).release().perform();

			// selenium screenshot action
			await resolve.wait(webdriver.until.elementLocated(webdriver.By.css(screenshot_config.wait_target)), screenshot_config.max_wait_time);
			await resolve.sleep(screenshot_config.max_wait_time);
			await resolve.findElement(webdriver.By.css(screenshot_config.screenshot_target)).takeScreenshot().then(img => {
				fs.writeFile(`${screenshot_config.screenshot_image_name}.png`, img, "base64", err => {
					// In case of a error throw err.
					if (err) {throw err;}
				});
			});
			await resolve.quit();
		}).catch(err => {
			throw console.error("[createClickScreenshot] error :: " + err);
		}).finally(()=>{
			console.log("[createClickScreenshot] complate");
		});
	}
}

// driver_config 더미
const driver_config = {
	server_url: "http://ote-mpm.imqa.io",
	service: "mpm",
	cookie: {
		name: "IMQA_OTE_SESSION",
		value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDQ4MjEzOTAsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoiYWRtaW5AaW1xYS5pbyIsImVtYWlsIjoiYWRtaW5AaW1xYS5pbyIsIm5pY2tuYW1lIjoi6rSA66as7J6QIiwiaXNfc3VwZXJ1c2VyIjoxLCJ1c2VyX3R6Ijo5LCJpYXQiOjE2NDQyMTY1OTAsImlzcyI6Im1wbS5pbXFhLmlvIiwic3ViIjoibXBtIn0.6hrvoP7lk43IGgpUH1yjP5WJ8NFMOK4LcB0p9smYhKU",
		domain: ".imqa.io",
		path: "/",
		secure: false
	}
};

// 셀레니움 접근할 페이지 url
const target_url = "http://ote-mpm.imqa.io/mpm/32/management/reference";

// screenshot 더미
const screenshot_config = {
	wait_target: ".setting-body", // 기다려야하는 target(#element : 아이디, .element: 클래스)
	max_wait_time: 5000, // 기다리는 텀(각 이벤트 구간마다 들어감)
	screenshot_target: ".setting-body", // 스크린샷할 타겟
	screenshot_image_name: "write_test_file" // 스크린샷 이미지 명(png)로 현재는 고정
};

const drag_config = {
	wait_target: ".histogram", // 기다려야하는 target(#element : 아이디, .element: 클래스)
	drag_start_target: ".histogram", // 드래그 시작할 타켓 (#element : 아이디, .element: 클래스) - 해당 target x,y 값을 구함
	drag_end_target: ".histogram", // 드래그 마지막 타켓 (#element : 아이디, .element: 클래스) - 해당 target x,y 값을 구함
	max_wait_time: 5000  // 기다리는 텀(각 이벤트 구간마다 들어감)
};

const selenium = new Selenium(driver, driver_config);
export default selenium;
