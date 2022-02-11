// 웹드라이브
import { driver } from "../driver";

// selenium 웹드라이브
import webdriver from "selenium-webdriver";
import fs from "fs";

/**
 * Selenium Class
 * 역할 : 셀레니움의 접속, 스크린샷 생성, 드래그 이후 스크린샷 생성, 클릭 이후 스크린샷생성, 드래그 이후 팝업 스크린샷 생성
 * webdriver, selenium webdriver 필요
 */
class Selenium {
	/**
   * 인스턴스로 생성시 필요한 파라미터
   * @param driver          the webdriver(크롬)
   * @param driver_config   Object webdriver server_url, login cookie(object)
   */
	constructor(driver) {
		this._driver = driver;
		this._driver_config = {
			workspace: null,
			server_url: null,
			cookie: null
		};
		this._webDriver = null;
	}

	/**
   * DriverConfig 추가 하는 역할
   * @param key      String config 키
   * @param value    String config 값
   */
	setDriverConfig(key, value){
		this._driver_config[key] = value;
	}

	/**
   * selenium 타겟 url로 브라우저 접속
   * @param target_url      String selenium 브라우저 접속 url
   * @param driver_config   Object selenium 타겟 사이트 접속시 필요한 쿠키 객체
   * @returns {Selenium}
   */
	connect(target_url, driver_config = this._driver_config){
		 this._webDriver = this._driver.then(resolve => resolve.build())
			.then(async resolve => {
				console.log("driver_config::::", target_url, driver_config);
				await resolve.get(driver_config.server_url);
				await resolve.manage().addCookie(driver_config.cookie);
				await resolve.get(target_url);
				return resolve;
			});
		return this;
	}

	/**
   * selenium 스크린샷 생성
   * @param screenshot_config selenium 스크린샷 conf 객체
   * @param MAX_WAIT_TIME     Number 각 이벤트마다 최대 기다리는 시간
   */
	createScreenshot(screenshot_config, MAX_WAIT_TIME){
		return this._webDriver.then(async resolve => {
			// selenium screenshot action
			await resolve.wait(webdriver.until.elementLocated(webdriver.By.css(screenshot_config.wait_target)), MAX_WAIT_TIME);
			await resolve.sleep(parseInt(MAX_WAIT_TIME));
			await resolve.findElement(webdriver.By.css(screenshot_config.screenshot_target)).takeScreenshot().then(img => {
				fs.writeFile(`file:${this._driver_config.workspace}/${screenshot_config.screenshot_image_name}.png`, img, "base64", err => {
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

	/**
   * selenium 드래그 후 스크린샷 생성
   * @param drag_config         Object selenium 드래그 conf 객체
   * @param screenshot_config   Object selenium 스크린샷 conf 객체
   * @param MAX_WAIT_TIME       Number 각 이벤트마다 최대 기다리는 시간
   */
	createDragScreenshot(drag_config, screenshot_config, MAX_WAIT_TIME){
		return this._webDriver.then(async resolve => {
			await resolve.wait(webdriver.until.elementLocated(webdriver.By.css(drag_config.wait_target)), MAX_WAIT_TIME);
			await resolve.sleep(MAX_WAIT_TIME);

			// selenium Drag element
			const targetElement = await resolve.findElement(webdriver.By.css(drag_config.drag_start_target));
			const startOffset = await targetElement.getRect();
			const endTargetElement = await resolve.findElement(webdriver.By.css(drag_config.drag_end_target));
			const endOffset = await endTargetElement.getRect();

			// selenium Drag action
			const actions = await resolve.actions();
			await actions.move({ x: parseInt(startOffset.x), y: parseInt(startOffset.y) }).press().move({ x: parseInt(endOffset.width + endOffset.x), y: parseInt(endOffset.height + endOffset.y) }).release().perform();

			// selenium screenshot action
			await resolve.wait(webdriver.until.elementLocated(webdriver.By.css(screenshot_config.wait_target)), MAX_WAIT_TIME);
			await resolve.sleep(MAX_WAIT_TIME);
			await resolve.findElement(webdriver.By.css(screenshot_config.screenshot_target)).takeScreenshot().then(img => {
				fs.writeFile(`file:${this._driver_config.workspace}/${screenshot_config.screenshot_image_name}.png`, img, "base64", err => {
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

	/**
   * selenium 드래그 후 팝업의 스크린샷 생성
   * @param drag_config         Object selenium 드래그 conf 객체
   * @param screenshot_config   Object selenium 스크린샷 conf 객체
   * @param MAX_WAIT_TIME       Number 각 이벤트마다 최대 기다리는 시간
   */
	createDragPopupScreenshot(drag_config, screenshot_config, MAX_WAIT_TIME) {
		return this._webDriver.then(async resolve => {
			await resolve.wait(webdriver.until.elementLocated(webdriver.By.css(drag_config.wait_target)), MAX_WAIT_TIME);
			await resolve.sleep(MAX_WAIT_TIME);

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
			await resolve.sleep(MAX_WAIT_TIME);
			await resolve.wait(webdriver.until.elementLocated(webdriver.By.className(screenshot_config.wait_target)), MAX_WAIT_TIME);
			await resolve.sleep(MAX_WAIT_TIME);
			await resolve.findElement(webdriver.By.className(screenshot_config.screenshot_target_class)).takeScreenshot().then(img => {
				fs.writeFile(`file:${this._driver_config.workspace}/${screenshot_config.screenshot_image_name}.png`, img, "base64", err => {
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
	/**
   * selenium 클릭 후 스크린샷 생성
   * @param click_target        String 클릭할 타겟 ("#id, .class" 형식)
   * @param screenshot_config   Object selenium 스크린샷 conf
   * @param MAX_WAIT_TIME       Number 각 이벤트마다 최대 기다리는 시간
   */
	createClickScreenshot(click_target, screenshot_config, MAX_WAIT_TIME){
		return this._webDriver.then(async resolve => {
			await resolve.wait(webdriver.until.elementLocated(webdriver.By.css(screenshot_config.wait_target)), MAX_WAIT_TIME);
			await resolve.sleep(MAX_WAIT_TIME);

			// selenium click element
			const targetElement = await resolve.findElement(webdriver.By.css(click_target));

			// selenium click action
			const actions = await resolve.actions();
			await actions.move({ origin: targetElement }).press().pause(1).release().perform();

			// selenium screenshot action
			await resolve.wait(webdriver.until.elementLocated(webdriver.By.css(screenshot_config.wait_target)), MAX_WAIT_TIME);
			await resolve.sleep(MAX_WAIT_TIME);
			await resolve.findElement(webdriver.By.css(screenshot_config.screenshot_target)).takeScreenshot().then(img => {
				fs.writeFile(`file://${this._driver_config.workspace}/${screenshot_config.screenshot_image_name}.png`, img, "base64", err => {
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

const selenium = new Selenium(driver);
export default selenium;
