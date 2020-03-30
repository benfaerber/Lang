module.exports = class Translation {
	constructor(obj) {
		// Required: poster, content, lang, posted
		this.poster = obj.poster;
		this.content = obj.content;
		this.lang = obj.lang;
		this.posted = obj.posted;
		this.edited = obj.edited || obj.posted;
		this.selected = obj.selected || false;
		this.votes = obj.votes || { up: 0, down: 0 };
	}
};
