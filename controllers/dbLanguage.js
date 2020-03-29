module.exports = db => {
	var module = {};

	var langs = db.collection('languages');

	module.searchLang = async term => {
		return await langs
			.find({
				$or: [
					{ name: { $regex: term, $options: 'gi' } },
					{ code: { $regex: term, $options: 'gi' } }
				]
			})
			.sort({ speakers: -1 })
			.toArray();
	};

	module.getLang = async code => {
		return await langs.findOne({ code: code });
	};

	module.playground = async () => {
		console.log(await module.getLang('en'));
	};

	return module;
};
