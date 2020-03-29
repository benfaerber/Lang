const express = require('express');
const session = require('express-session');
const app = express();

const db = require('./controllers/database/mongo');
const userApi = require('./controllers/api/user');
const locationSearchApi = require('./controllers/api/locationSearch');
const languageSearchApi = require('./controllers/api/languageSearch');
const userLogin = require('./controllers/user/login');

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
app.set('view engine', 'ejs');

// Home page
app.get('/', (req, res) => {
	res.render('pages/index');
});

app.post('/login', async (req, res) => {
	let success = await userLogin.login(req, res);
	// Render ejs n shit
	res.end();
});

app.post('/register', async (req, res) => {
	let success = await userLogin.register(req, res);
	res.end();
});

app.get('/signout', (req, res) => {
	req.session.destroy();
	res.redirect('/login');
});

// API
// User API
// Usage: /api/getUser
app.get('/api/getUser', async (req, res) => {
	userApi.getUser(req, res);
});

app.get('/api/currentUser', async (req, res) => {
	res.end(req.session.user);
});

// Search API
// Usage: /api/searchCountry?co=SEARCH
app.get('/api/searchCountry', async (req, res) => {
	locationSearchApi.searchCountry(req, res);
});
// Usage: /api/searchCountry?co=COUNTRY&st=SEARCH
app.get('/api/searchState', async (req, res) => {
	locationSearchApi.searchState(req, res);
});
// Usage: /api/searchCity?co=COUNTRY&ci=SEARCH (&st=OPTIONAL_STATE)
app.get('/api/searchCity', async (req, res) => {
	locationSearchApi.searchCity(req, res);
});
// Usage: /api/searchLanguage?term=SEARCH
app.get('/api/searchLanguage', async (req, res) => {
	languageSearchApi.searchLang(req, res);
});

// End Location Search API

app.listen(8080);
