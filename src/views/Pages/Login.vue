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
                <b-form role="form" @submit.prevent="onSubmit">
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
                    <base-button type="primary" native-type="submit" class="my-4">Sign In</base-button>
                  </div>
                </b-form>
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
import UserModel from "../../model/user/UserModel";
import { setAuthInHeader } from "@/api/axios";

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
			UserModel.login({ id: this.model.email, password: this.model.password }).subscribe(res => {
				console.log(res.headers);

				// this.$store.commit("config/setCookie");
				this.$router.push({ path: "/workspace" });
			}, err => {
				alert("계정 정보가 잘못되었습니다. \n 다시 한번 입력해주세요.");
			});
			// this.$router.push({ path: "/" });
		},
		_setCookie(cookie_name, value, miuntes) {
			document.cookie = cookie_name + "=" + cookie_value;
		}
	}
};
</script>
