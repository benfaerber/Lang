let db;

const mongo = require('mongodb').MongoClient;
const connectionString = 'mongodb://localhost:27017/';
let user, city, lang;

(async () => {
	let client = await mongo.connect(connectionString, {
		useUnifiedTopology: true,
		useNewUrlParser: true
	});
	db = client.db('node');
	// Import modules here:
	user = require('./dbUser')(db);
	city = require('./dbCities')(db);
	lang = require('./dbLanguage')(db);

	exports.user = user;
	exports.city = city;
	exports.lang = lang;

	// Run whatever playground needs to be run:
	//await lang.playground();
})().catch(err => console.error(err));
