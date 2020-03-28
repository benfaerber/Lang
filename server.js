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
	res.send('hello');
});

app.listen(8080);
