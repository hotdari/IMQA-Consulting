<template>
  <div>
    <!-- Page content -->
    <b-container>
      <b-row class="justify-content-center align-content-center vh-100">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-secondary border-1 mb-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>IMQA Consulting에 접속하신 것을 환영합니다.</small>
              </div>
              <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input alternative
                              class="mb-3"
                              name="Email"
                              prepend-icon="ni ni-email-83"
                              placeholder="Email"
                              v-model="model.email">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              name="Password"
                              prepend-icon="ni ni-lock-circle-open"
                              type="password"
                              placeholder="Password"
                              v-model="model.password">
                  </base-input>

                  <b-form-checkbox v-model="model.rememberMe">아이디 저장</b-form-checkbox>
                  <div class="text-center">
                    <base-button type="primary" native-type="submit" class="my-4 loginBtn">Sign In</base-button>
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
<!--          <b-row class="mt-3">-->
<!--            <b-col cols="6">-->
<!--              <router-link to="/dashboard" class="text-light"><small>Forgot password?</small></router-link>-->
<!--            </b-col>-->
<!--            <b-col cols="6" class="text-right">-->
<!--              <router-link to="/register" class="text-light"><small>Create new account</small></router-link>-->
<!--            </b-col>-->
<!--          </b-row>-->
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import login from "@/api/Login";

import { ipcRenderer } from "electron";
import selenium from "../../../model/Selenium";
export default {
	data() {
		return {
			model: {
				email: "",
				password: "",
				rememberMe: false
			}
		};
	},
	methods: {
		onSubmit() {
			ipcRenderer.send("loginBtn", { id: this.model.email, password: this.model.password });

			ipcRenderer.on("loginBtn-reply", (event, arg) => {
				if(arg.massage === "error") {
					alert("계정정보가 없습니다.\n다시 입력해주세요.");
					return;
				}

				selenium.setDriverConfig("server_url", "http://ote-mpm.imqa.io");
				selenium.setDriverConfig("cookie", arg);

				this.$router.push({ path: "/workspace" });
			});
			// login.connect();

		}
	}
};
</script>
