const Translation = require('../../models/translation');
const TranslationRequest = require('../../models/translationRequest');

module.exports = db => {
	var module = {};
	var trans = db.collection('translations');

	// Takes request class
	module.createRequest = async request => {
		let toSave = request.toSave();
		await trans.insertOne(toSave);
		console.log(`Request '${request.title}' by '${request.poster}' was added!`);
	};

	// Accepts TranslationRequest object with id, Translation object
	// Returns boolean based on success
	module.createTranslation = async (forRequest, translation) => {
		if (
			!(forRequest instanceof TranslationRequest) ||
			!(translation instanceof Translation)
		) {
			return false;
		}

		await trans.updateOne(
			{ _id: forRequest._id },
			{ $push: { translations: translation } }
		);
		console.log(
			`Translation for '${forRequest.title}' by '${forRequest.poster}' added by '${translation.poster}'`
		);
		return true;
	};

	module.getUsersRequest = async username => {
		return await trans
			.find({ poster: username })
			.toArray()
			.map(elem => new TranslationRequest(elem));
	};

	module.getUsersTranslations = async username => {
		let results = await trans
			.find({ translations: { $elemMatch: { poster: username } } })
			.toArray();

		let found = [];
		results.forEach(obj => {
			obj.translations.forEach(translation => {
				if (translation.poster === username) {
					found.push(translation);
				}
			});
		});
		return found.map(elem => new Translation(elem));
	};

	// Returns a mixed type array (shudders) of Translation and TranslationRequest objects
	module.getUsersOverview = async username => {
		let results = await trans
			.find({
				$or: [
					{ translations: { $elemMatch: { poster: username } } },
					{ poster: username }
				]
			})
			.toArray();

		let found = [];
		results.forEach(obj => {
			if (obj.poster === username) {
				obj.type = 'request';
				found.push(obj);
			}

			obj.translations.forEach(translation => {
				if (translation.poster === username) {
					translation.type = 'translation';
					found.push(translation);
				}
			});
		});
		return found.map(elem => {
			if (elem.type === 'request') {
				return new TranslationRequest(elem);
			} else {
				return new Translation(elem);
			}
		});
	};

	module.getRequests = async () => {
		let result = await trans
			.find({})
			.sort({ posted: -1 })
			.toArray();
		return result.map(elem => new TranslationRequest(elem));
	};

	module.getRequest = async id => await trans.findOne({ _id: id });

	module.playground = async () => {
		// Required: title, body, content, poster, lang, targetLangs, posted
		let testRequestObj = {
			title: 'Another Request tee hee',
			body:
				'This is my grandmas letter, I want it translated to english or spanish.',
			content: 'Ich bin Oma, du Schlampe!',
			lang: 'de',
			poster: 'liltim',
			targetLangs: ['en', 'es'],
			posted: 1585531923
		};

		// Required: poster, content, lang, posted
		let testTranslationObj = {
			poster: 'liltim',
			content: 'No creo',
			lang: 'es',
			posted: 1585531953
		};

		let request = new TranslationRequest(testRequestObj);

		//module.createRequest(request);

		/*
		let timRequests = await module.getUsersRequest('liltim');
		let timRequest = new TranslationRequest(timRequests[1]);
		let translation = new Translation(testTranslationObj);
		module.createTranslation(timRequest, translation);
    */
		console.log(await module.getRequests('liltim'));
	};

	return module;
};
