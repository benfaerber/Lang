const db = require('../../database/mongo');

error = { error: 'There is an error with your request' };

exports.searchCountry = async (req, res) => {
	if (!req.query.co) {
		res.json(error);
		return;
	}

	if (req.query.co.length < 2) {
		res.json({ response: 'too short' });
		return;
	}

	let search = await db.city.searchCountry(req.query.co);
	res.json(search);
};

exports.searchState = async (req, res) => {
	if (!req.query.st || !req.query.co) {
		res.json(error);
		return;
	}

	if (req.query.st.length < 2 || req.query.co.length < 4) {
		res.json({ response: 'too short' });
		return;
	}

	let search = await db.city.searchState(req.query.co, req.query.st);
	res.json(search);
};

exports.searchCity = async (req, res) => {
	if (!req.query.ci || !req.query.co) {
		res.json(error);
		return;
	}

	if (req.query.ci.length < 2 || req.query.co.length < 4) {
		res.json({ response: 'too short' });
		return;
	}

	let state = req.query.st || '';
	let search = await db.city.searchCity(req.query.co, state, req.query.ci);
	res.json(search);
};
