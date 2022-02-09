import {driver} from "../driver";
import webdriver from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

const fs = require('fs')

class Selenium {
  constructor() {
  }

  connect() {
    driver.then(resolve => resolve.build())
      .then(async resolve => {
        await resolve.get("http://ote-mpm.imqa.io/")
        await resolve.manage().addCookie({
          name: 'IMQA_OTE_SESSION',
          value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDM3Nzk4MDIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoiYWRtaW5AaW1xYS5pbyIsImVtYWlsIjoiYWRtaW5AaW1xYS5pbyIsIm5pY2tuYW1lIjoi6rSA66as7J6QIiwiaXNfc3VwZXJ1c2VyIjoxLCJ1c2VyX3R6Ijo5LCJpYXQiOjE2NDMxNzUwMDIsImlzcyI6Im1wbS5pbXFhLmlvIiwic3ViIjoibXBtIn0.p-3DmsHjkhHpf-KwoRByjTJNSkePjEu05h4IpmCaUsA',
          domain: '.imqa.io',
          path: '/',
          secure: false
        });
        return resolve;
      })
      .then(async resolve => {
        await resolve.get("http://ote-mpm.imqa.io/mpm/32/management/reference")
        await resolve.wait(webdriver.until.elementLocated(webdriver.By.className("setting-body")), 5000);
        await resolve.findElement(webdriver.By.className("setting-body")).takeScreenshot().then(img => {
          fs.writeFile('write_test_file.png', img, 'base64',(err) => {
            // In case of a error throw err.
            if (err) throw err;
          })
        });
        await resolve.quit();
      })
  }
}

const selenium = new Selenium();
export default selenium;
