const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//.use is used to register middleware
//next is used to tell your middleware when the function is complete
//if next is not called the handlers will never work
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = now + ": " + req.method + " " + req.url;
	console.log(log);
	//callback is required
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err){
			console.log('Unable to access server.log')
		}
	});
	next();
});
//sometimes we can avoid callling next in case something goes wrong

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})

//set up a handler for an http get request
//request is what the request is and response has methods to work
app.get('/', (req, res) => {
	// res.send('<h1>Hello express</h1>');
	res.render('home.hbs', {
		pageTitle: 'Home',
		welcomeMessage: 'Welcome to your website, Wasif'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: 'Projects'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Whoops! We ran into some error',
		errorCode: 'BAD-PAGE'
	});
});

//routes are set up and app.listen binds application to port
//3000 is used for developing
app.listen(3000, () => {
	console.log('Server is up on port', 3000);
});