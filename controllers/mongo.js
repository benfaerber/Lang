let db;

const mongo = require('mongodb').MongoClient;
const connectionString = 'mongodb://localhost:27017/';
let dbUser, dbCities;

(async () => {
	let client = await mongo.connect(connectionString, {
		useUnifiedTopology: true,
		useNewUrlParser: true
	});
	db = client.db('node');
	// Import modules here:
	dbUser = require('./dbUser')(db);
	dbCities = require('./dbCities')(db);

	await playground();
})().catch(err => console.error(err));

playground = async () => {
	await dbCities.playground();
};
