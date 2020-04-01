const db = require('../../database/mongo');

error = { error: 'There is an error with your request' };

exports.searchLang = async (req, res) => {
	if (!req.body.term) {
		res.json(error);
		return;
	}

	if (req.body.term.length < 2) {
		res.json({ response: 'too short' });
		return;
	}

	let search = await db.lang.searchLang(req.body.term);
	res.json(search);
};
