const db = require('../../database/mongo');

error = { error: 'There is an error with your request' };

exports.searchCountry = async (req, res) => {
	if (!req.body.co) {
		res.json(error);
		return;
	}

	if (req.body.co.length < 2) {
		res.json({ response: 'too short' });
		return;
	}

	let search = await db.city.searchCountry(req.body.co);
	res.json(search);
};

exports.searchState = async (req, res) => {
	if (!req.body.st || !req.body.co) {
		res.json(error);
		return;
	}

	if (req.body.st.length < 2 || req.body.co.length < 4) {
		res.json({ response: 'too short' });
		return;
	}

	let search = await db.city.searchState(req.body.co, req.body.st);
	res.json(search);
};

exports.searchCity = async (req, res) => {
	if (!req.body.ci || !req.body.co) {
		res.json(error);
		return;
	}

	if (req.body.ci.length < 2 || req.body.co.length < 4) {
		res.json({ response: 'too short' });
		return;
	}

	let state = req.body.st || '';
	let search = await db.city.searchCity(req.body.co, state, req.body.ci);
	res.json(search);
};
