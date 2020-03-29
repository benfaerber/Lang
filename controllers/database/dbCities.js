module.exports = db => {
	var module = {};

	var cities = db.collection('cities');
	var countries = db.collection('countries');
	var searchLimit = 100;

	module.searchCountry = async term => {
		if (term.length == 2) {
			term = term.toUpperCase();
			return await countries.find({ code: term }).toArray();
		} else {
			return await countries
				.find({
					$or: [
						{ tags: { $regex: term, $options: 'gi' } },
						{ country: { $regex: term, $options: 'gi' } }
					]
				})
				.limit(searchLimit)
				.toArray();
		}
	};

	module.searchState = async (country, term) => {
		let found = await cities
			.find({
				country: country,
				subcountry: { $regex: term, $options: 'gi' }
			})
			.limit(searchLimit)
			.toArray();

		found = found.map(f => f.subcountry);

		states = [];
		found.forEach(item => {
			if (!states.includes(item)) {
				states.push(item);
			}
		});

		return states;
	};

	module.searchCity = async (country, state, term) => {
		if (state) {
			return await cities
				.find({
					country: country,
					subcountry: state,
					name: { $regex: term, $options: 'gi' }
				})
				.limit(searchLimit)
				.toArray();
		} else {
			return await cities
				.find({
					country: country,
					name: { $regex: term, $options: 'gi' }
				})
				.limit(searchLimit)
				.toArray();
		}
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
