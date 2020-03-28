const mongo = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const User = require('../models/user');

const connectionString = 'mongodb://localhost:27017/';
let db;
let uc;

(async () => {
	let client = await mongo.connect(connectionString, {
		useUnifiedTopology: true,
		useNewUrlParser: true
	});

	db = client.db('node');
	uc = db.collection('users');
	await playground();
})().catch(err => console.error(err));

let testUser = new User({
	firstName: 'Ben',
	lastName: 'Franklin',
	username: 'bfrank',
	bio: 'my bio',
	pfp: 'https://placehold.co/64x64',
	created: 1581724800,
	lastActive: 1581724800,
	points: { de: 100, en: 20, es: 10 },
	speaks: { en: 'n', de: 'b1'}
});

playground = async () => {
	let user = await getUser('liltim');
	console.log(user);
};

getAllUsers = async () => {
	let result = await uc.find({}).toArray();
	return result.map(user => new User(user));
};

getUser = async uname => new User(await uc.findOne({ username: uname }));

getPassword = async uname => {
	let result = await uc.findOne({ username: uname });
	let pass = result ? result.password : null;
	return pass;
};

createUser = async (user, password) => {
	obj = user.toSave();
	obj.password = await bcrypt.hash(password, 10);
	uc.insertOne(obj);
	console.log(`User '${user.username}' was created.`);
};

changePassword = async (user, newPassword) => {
	let hashed = await bcrypt.hash(newPassword, 10);
	await uc.updateOne(
		{ username: user.username },
		{ $set: { password: hashed } }
	);
	console.log(`User '${user.username}' changed their password.`);
};

// returns boolean if auth passes
checkPassword = async (username, testPass) => {
	let userPass = await getPassword(username);
	if (!userPass) {
		return false;
	}

	return await bcrypt.compare(testPass, userPass);
};
