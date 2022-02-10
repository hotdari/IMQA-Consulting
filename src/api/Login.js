import axios from "axios";

class Login {
	connect(){
		axios.post("http://ote.imqa.io/user/admin@imqa.io`", { username: "admin@imqa.io", password: "djslzja0080" }).then(res => {
			console.log(res);
		});
	}
}
const login = new Login();;
export default login;
