module.exports = db => {
	var module = {};

	var cities = db.collection('cities');
	var countries = db.collection('countries');

	module.searchCountry = async term => {
		return await countries
			.find({
				$text: { $search: term }
			})
			.toArray();
	};

	module.searchState = async (country, term) => {
		let found = await cities
			.find({
				country: country,
				$text: { $search: term }
			})
			.toArray();

		found = found.map(f => f.subcountry);
		console.log(found);

		states = [];
		found.forEach(item => {
			if (!states.includes(item)) {
				states.push(item);
			}
		});

		return states;
	};

	module.searchCity = async (country, state, term) => {
		return cities
			.find({
				country: country,
				subcountry: state,
				$text: { $search: term }
			})
			.toArray();
	};

	playground = async () => {
		let search = await module.searchCity(
			'United States',
			'New York',
			'new york city'
		);
	};

	return module;
};
