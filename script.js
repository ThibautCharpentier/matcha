const getCookie = (name) => {
	const cookies = document.cookie.split(';');

	for (let i = 0; i < cookies.length; i++)
	{
		const cookie = cookies[i].trim();
		if (cookie.startsWith(name + '='))
			return cookie.substring(name.length + 1);
	}
	return null;
}

const getUrlData = () => {
	const	tab = location.hash.slice(1).split("&");
	let param = {};

	for (let i in tab)
	{
		let key = decodeURIComponent(tab[i].split("=")[0]);
		let value = decodeURIComponent(tab[i].split("=")[1]);
		param[key] = value;
	}
	return (param);
}

const signup = () => {
	const obj = {
		username: 'username',
		firstname: 'firstname',
		lastname: 'lastname',
		email: 'tybo.charpentier@gmail.com',
		password: 'password123'
	}
	
	axios.post(`http://${window.location.hostname}:8000/auth/signup`, obj, {
		withCredentials: true,
	})
	.then((res) => {
		console.log(res)
	})
	.catch((err) => {
		console.log(err);
	});
}

const verifyemail = () => {
	const param = getUrlData();

	axios.get(`http://${window.location.hostname}:8000/auth/verifyemail?token=${param.token_mail}`, {
		withCredentials: true,
	})
	.then((res) => {
		console.log(res)
	})
	.catch((err) => {
		console.log(err);
	});
}

const signin = () => {
	const obj = {
		username: 'username',
		password: 'password1234'
	}
	
	axios.post(`http://${window.location.hostname}:8000/auth/signin`, obj, {
		withCredentials: true,
	})
	.then((res) => {
		console.log(res)
	})
	.catch((err) => {
		console.log(err);
	});
}

const isconnected = () => {
	axios.get(`http://${window.location.hostname}:8000/auth/isconnected`, {
		withCredentials: true,
	})
	.then((res) => {
		console.log(res)
	})
	.catch((err) => {
		console.log(err);
	});
}

const refresh = () => {
	axios.get(`http://${window.location.hostname}:8000/auth/refresh`, {
		withCredentials: true,
	})
	.then((res) => {
		console.log(res)
	})
	.catch((err) => {
		console.log(err);
	});
}

const signout = () => {
	axios.post(`http://${window.location.hostname}:8000/auth/signout`, null, {
		withCredentials: true,
	})
	.then((res) => {
		console.log(res)
	})
	.catch((err) => {
		console.log(err);
	});
}

const forgotpassword = () => {
	const obj = {
		email: 'tybo.charpentier@gmail.com',
	}

	axios.post(`http://${window.location.hostname}:8000/auth/forgotpassword`, obj, {
		withCredentials: true,
	})
	.then((res) => {
		console.log(res)
	})
	.catch((err) => {
		console.log(err);
	});
}

const changepassword = () => {
	const param = getUrlData();

	const obj = {
		password: 'password1234'
	}
	
	axios.post(`http://${window.location.hostname}:8000/auth/changepassword?token=${param.token_password}`, obj, {
		withCredentials: true,
	})
	.then((res) => {
		console.log(res)
	})
	.catch((err) => {
		console.log(err);
	});
}

//window.onload = signup();
//window.onload = verifyemail();
//window.onload = signin();
//window.onload = isconnected();
//window.onload = refresh();
//window.onload = signout();
//window.onload = forgotpassword();
//window.onload = changepassword();
