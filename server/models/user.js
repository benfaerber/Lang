module.exports = class User {
	constructor(obj) {
		// Required when creating a user
		//username, created
		this.username = obj.username;
		this.bio = obj.bio || '';
		this.pfp = obj.pfp || '';
		this.created = obj.created;
		this.lastActive = obj.lastActive || obj.created;
		this.points = obj.points || {};
		if (this.points && Object.keys(this.points).length !== 0) {
			this.totalPoints = Object.values(this.points).reduce((acc, c) => acc + c);
		} else {
			this.totalPoints = 0;
		}

		this.speaks = obj.speaks || {};
	}

	toSave() {
		let obj = {
			username: this.username,
			bio: this.bio,
			pfp: this.pfp,
			created: this.created,
			lastActive: this.lastActive,
			points: this.points
		};
		return obj;
	}
};
