export const setCookie = function (name, value) {
	document.cookie = name + "=" + value;
};


export const getCookie = function (name) {
	const value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
	return value ? value[2] : null;
};

export const deleteCookie = function (name) {
	const date = new Date();
	document.cookie = name + "= " + "; expires=" + date.toUTCString() + "; path=/";
};
