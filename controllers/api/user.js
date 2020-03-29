const db = require('../database/mongo');

error = { error: 'There is an error with your request' };

exports.getUser = async (req, res) => {
	if (!req.session.user) {
		res.json(error);
		return;
	}

	let user = await db.user.getUser(req.session.user);
	if (!user) {
		res.json(error);
		return;
	}

	res.json(user);
};
