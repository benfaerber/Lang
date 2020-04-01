const LanguageDetect = require('languagedetect');
const detector = new LanguageDetect();

exports.detectLang = (req, res) => {
	if (!req.body.text) {
		res.json({ error: 'There was an error with your request' });
		return;
	}

	if (req.body.text.length < 20) {
		res.json({ error: 'too short' });
		return;
	}

	let results = detector
		.detect(req.body.text)
		.map(elem => elem[0].substring(0, 1).toUpperCase() + elem[0].substring(1));

	if (results.length === 0) {
		res.json({});
		return;
	}

	let backup = [];
	if (results.length >= 3) {
		backup = [results[1], results[2]];
	}

	res.json({
		guess: results[0],
		backup: backup
	});
};
