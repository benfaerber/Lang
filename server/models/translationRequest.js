module.exports = class TranslationRequest {
	constructor(obj) {
		// Required: title, body, content, poster, lang, targetLangs, posted
		this._id = obj._id || -1;
		this.title = obj.title;
		this.body = obj.body;
		this.content = obj.content;
		this.poster = obj.poster;
		this.lang = obj.lang;
		this.poster = obj.poster;
		this.posted = obj.posted;
		this.edited = obj.edited || obj.posted;
		this.votes = obj.votes || { up: 0, down: 0 };
		this.targetLangs = obj.targetLangs;
		this.translations = obj.translations || [];
	}

	toSave() {
		let obj = {
			title: this.title,
			body: this.body,
			content: this.content,
			poster: this.poster,
			posted: this.posted,
			lang: this.lang,
			votes: this.votes,
			targetLangs: this.targetLangs,
			translations: this.translations
		};
		return obj;
	}
};
