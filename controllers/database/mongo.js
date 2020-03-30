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
	exports.user = require('./dbUser')(db);
	exports.city = require('./dbCities')(db);
	exports.lang = require('./dbLanguage')(db);
	exports.tran = require('./dbTranslation')(db);

	// Run whatever playground needs to be run:
	//await exports.tran.playground();
})().catch(err => console.error(err));
