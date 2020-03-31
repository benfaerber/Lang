const db = require('../../database/mongo');

error = { error: 'There is an error with your request' };

exports.searchLang = async (req, res) => {
	if (!req.query.term) {
		res.json(error);
		return;
	}

	if (req.query.term.length < 2) {
		res.json({ response: 'too short' });
		return;
	}

	let search = await db.lang.searchLang(req.query.term);
	res.json(search);
};
