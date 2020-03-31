const db = require('../database/mongo');
const User = require('../../models/user');

exports.login = async (req, res) => {
	if (!req.body.username || !req.body.password) {
		return { ok: false, message: 'Data missing!' };
	}

	const check = await db.user.checkPassword(
		req.body.username,
		req.body.password
	);

	if (check) {
		console.log(`User '${req.body.username}' logged in!`);
		req.session.user = req.body.username;
	}
	return check;
};

exports.register = async (req, res) => {
	let fname = req.body.firstName;
	let lname = req.body.lastName;
	let uname = req.body.username;
	let password = req.body.password;

	if (!fname || !lname || !uname || !password) {
		return false;
	}

	if (
		fname.length > 20 ||
		lname.length > 20 ||
		uname.length > 25 ||
		password.length > 100
	) {
		return false;
	}

	let now = Math.floor(+new Date() / 1000);
	userValues = {
		firstName: fname,
		lastName: lname,
		username: uname,
		created: now
	};

	let user = new User(userValues);

	await db.user.createUser(user, password);
	req.session.user = uname;
};
