const bcrypt = require('bcrypt');
const User = require('../../models/user');

module.exports = db => {
	var uc = db.collection('users');
	var module = {};

	module.getAllUsers = async () => {
		let result = await uc.find({}).toArray();
		return result.map(user => new User(user));
	};

	module.getUser = async uname => {
		let user = await uc.findOne({ username: uname });
		if (!user) {
			return null;
		}
		return new User(user);
	};

	module.getPassword = async uname => {
		let result = await uc.findOne({ username: uname });
		let pass = result ? result.password : null;
		return pass;
	};

	module.createUser = async (user, password) => {
		obj = user.toSave();
		obj.password = await bcrypt.hash(password, 10);
		uc.insertOne(obj);
		console.log(`User '${user.username}' was created.`);
	};

	module.changePassword = async (user, newPassword) => {
		let hashed = await bcrypt.hash(newPassword, 10);
		await uc.updateOne(
			{ username: user.username },
			{ $set: { password: hashed } }
		);
		console.log(`User '${user.username}' changed their password.`);
	};

	// returns boolean if auth passes
	module.checkPassword = async (username, testPass) => {
		let userPass = await module.getPassword(username);
		if (!userPass) {
			return false;
		}

		return await bcrypt.compare(testPass, userPass);
	};

	return module;
};
