const express = require('express');
const session = require('express-session');
const app = express();

app.use('/static', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: 'keyboard cat',
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

// User API
const userApi = require('./controllers/api/user');
app.get('/api/getUser', async (req, res) => {
	userApi.getUser(req, res);
});

// Location Search API
const locationSearchApi = require('./controllers/api/locationSearch');
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

// End Location Search API

app.listen(8080);
