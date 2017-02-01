//you use this kind of notacion to generate
//variabels in a group. You don't need to keep
//writing var.
var express = require('express'),
     bodyParser = require('body-parser'),
     pug = require('pug'),
     searchRoutes = require('./routes/search');

var app = express(),
    userStore = require('./user-reader');

//this sets the layout of the webpage.
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/search', searchRoutes);

//this looks in the root '/' and gets 
//the the data of th users.
app.get('/', (request, response) => {
 response.render('index', { users: userStore.getUsers() });
});

//This sets up the port for the webpage.
app.listen(3000, () => {
 console.log('Web Server is running on port 3000');
});