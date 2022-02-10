export const setCookie = function (name, value) {
	document.cookie = name + "=" + value;
};


export const getCookie = function (name) {
	const value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
	return value ? value[2] : null;
};

export const getLoginCookies = function (cookies) {
	const cookie = cookies.split(";");
	const result = {};
	for (let i = 0; i < cookie.length; i++) {
		const c = cookie[i].split("=");
		if(i === 0){
			result.name = c[0].trim();
			result.value = c[1].trim();
		} else {
			result[c[0].toLowerCase().trim()] = c[1];
		}
		console.log(result);

	}
	return result;
};

export const deleteCookie = function (name) {
	const date = new Date();
	document.cookie = name + "= " + "; expires=" + date.toUTCString() + "; path=/";
};
