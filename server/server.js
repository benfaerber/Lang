const express = require('express');
const session = require('express-session');
const app = express();

const db = require('./controllers/database/mongo');
const userApi = require('./controllers/api/auth/user');
const locationSearchApi = require('./controllers/api/search/locationSearch');
const languageSearchApi = require('./controllers/api/search/languageSearch');
const languageDetectApi = require('./controllers/api/search/languageDetect');
const authApi = require('./controllers/api/auth/auth');
const imgApi = require('./controllers/api/img/img');

app.use('/static', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: 'robotic horse asshole',
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false }
	})
);

app.post('/api/login', async (req, res) => {
	await authApi.login(req, res);
});

app.post('/api/register', async (req, res) => {
	await authApi.register(req, res);
});

app.get('/api/signout', (req, res) => {
	req.session.destroy(err => {
		if (err) console.error(err);
		res.json({status: 'ok'})
	});
});

app.get('/api/getUser', async (req, res) => {
	userApi.getUser(req, res);
});

app.get('/api/currentUser', async (req, res) => {
	res.end(req.session.user);
});

app.get('/api/searchCountry', async (req, res) => {
	locationSearchApi.searchCountry(req, res);
});

app.get('/api/searchState', async (req, res) => {
	locationSearchApi.searchState(req, res);
});

app.get('/api/searchCity', async (req, res) => {
	locationSearchApi.searchCity(req, res);
});

app.get('/api/searchLanguage', async (req, res) => {
	languageSearchApi.searchLang(req, res);
});

app.get('/api/detectLanguage', (req, res) => {
	languageDetectApi.detectLang(req, res);
});

app.get('/api/profilePic', (req, res) => {
	imgApi.profilePic(req, res);
})

app.listen(8080);
