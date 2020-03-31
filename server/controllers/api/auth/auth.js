const db = require('../../database/mongo');
const User = require('../../../models/user');

exports.login = async (req, res) => {
	if (!req.body.username || !req.body.password) {
		res.json({ ok: false, message: 'Data missing!' });
	}

	const check = await db.user.checkPassword(
		req.body.username,
		req.body.password
	);

	if (check) {
		console.log(`User '${req.body.username}' logged in!`);
		req.session.user = req.body.username;
		let user = await db.user.getUser(req.body.username);
		res.json({status: 'ok', user})
	} else {
		res.json({status: 'error'})
	}
};

exports.register = async (req, res) => {
	let uname = req.body.username;
	let password = req.body.password;

	if (!fname || !lname || !uname || !password) {
		res.json({status: 'error'});
		return;
	}

	if (
		uname.length > 25 ||
		password.length > 100
	) {
		res.json({status: 'error'});
		return;
	}

	let existingUser = db.user.getUser(uname);
	if (existingUser) {
		res.json({status: 'error'});
		return;
	}

	let now = Math.floor(+new Date() / 1000);
	userValues = {
		username: uname,
		created: now
	};

	let user = new User(userValues);
	await db.user.createUser(user, password);
	req.session.user = uname;
	res.json({status: 'ok'})
};
