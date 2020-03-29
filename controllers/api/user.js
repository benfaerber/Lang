const db = require('../database/mongo');

error = { error: 'There is an error with your request' };

exports.getUser = async (req, res) => {
	if (!req.query.user) {
		res.json(error);
		return;
	}

	let user = await db.user.getUser(req.query.user);
	if (!user) {
		res.json(error);
		return;
	}

	res.json(user);
};
