module.exports = class User {
	constructor(json) {
		// Required when creating a user
		//firstName, lastName, username, created

		this.firstName = json.firstName;
		this.lastName = json.lastName;
		this.username = json.username;
		this.bio = json.bio || '';
		this.pfp = json.pfp || '';
		this.created = json.created;
		this.lastActive = json.lastActive || json.created;
		this.points = json.points || {};
		if (Object.keys(this.points).length !== 0) {
			this.totalPoints = Object.values(this.points).reduce((acc, c) => acc + c);
		} else {
			this.totalPoints = 0;
		}

		this.speaks = json.speaks || {};
	}

	toSave() {
		obj = {
			firstName: this.firstName,
			lastName: this.lastName,
			username: this.username,
			bio: this.bio,
			pfp: this.pfp,
			created: this.created,
			lastActive: this.lastActive,
			points: this.points,
		};
		return obj;
	}
	
	fullname() {
		return `${this.firstName} ${this.lastName}`;
	}
};