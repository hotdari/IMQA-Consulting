import { Observable } from "rxjs";
import { NetworkInjector } from "@/model/common/NetworkInjector";
import webdriver from "selenium-webdriver";
import fs from "fs";

export default {
	screenshotAction: function (config = {}){
		driver.then(resolve => resolve.build())
			.then(async resolve => {
				await resolve.get("http://ote-mpm.imqa.io/");
				await resolve.manage().addCookie({
					name: "IMQA_OTE_SESSION",
					value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDQ3OTk5NDUsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoiYWRtaW5AaW1xYS5pbyIsImVtYWlsIjoiYWRtaW5AaW1xYS5pbyIsIm5pY2tuYW1lIjoi6rSA66as7J6QIiwiaXNfc3VwZXJ1c2VyIjoxLCJ1c2VyX3R6Ijo5LCJpYXQiOjE2NDQxOTUxNDUsImlzcyI6Im1wbS5pbXFhLmlvIiwic3ViIjoibXBtIn0.TAEfP85Gh5SvN6gxCneaGsF3vODFg7Lfs7qQeHI40fk",
					domain: ".imqa.io",
					path: "/",
					secure: false
				});
				return resolve;
			})
			.then(async resolve => {
				await resolve.get("http://ote-mpm.imqa.io/mpm/32/management/reference");
				await resolve.wait(webdriver.until.elementLocated(webdriver.By.className("setting-body")), 5000);
				await resolve.findElement(webdriver.By.className("setting-body")).takeScreenshot().then(img => {
					fs.writeFile("./dir/write_test_file.png", img, "base64", err => {
						// In case of a error throw err.
						if (err) {throw err;}
					});
				});
				await resolve.quit();
			});



    axios.post(`/api/user/${this.id}`, params)
      .then(res => {
        this.$store.commit("setTimezone", res.data.user_tz);
        location.href = "/";
      })
      .catch(err => {
        switch (err.response.status) {
          case 401:
            location.href = "/user/auth_email_before_confirm?email=" + this.id;
            break;
          case 403:
            if (err.response.data.fail_count > 4) {
              alert(this.$t("login.alert.login_fail_all"));
              location.href = "/user/reset_password";
            } else if (err.response.data.fail_count <= 4) {
              alert(`${this.$t("login.alert.login_fail")} (${err.response.data.fail_count}/5)`);
            }
            break;
          default:
            alert(this.$t("login.alert.login_fail"));
            break;
        }
      });
  }


		const subscribers = new NetworkInjector().inject("selenium", "screenshotAction");
		return new Observable(subscriber => {
			subscribers.request(config, subscriber);
		});
	}
};
