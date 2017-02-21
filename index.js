const express = require('express'),
			pug = require('pug'),
			morgan = require('morgan'),
			bodyParser = require('body-parser'),
			fs = require('fs');

const userRoutes = require('./routes/users'),
			searchRoutes = require('./routes/search'),
			addRoutes = require('./routes/add-user');

const app = express();
		userStore = require('./user-reader');

var likeStore;  
fs.readFile('likes.json', function (error, data){
	if (error) {
		throw error;
	} else {
		likeStore = (JSON.parse(data));
	}
});

app.use(express.static('public'));

app.set('view engine', 'pug');
///////
app.use(express.static('./public'));
///////
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', userRoutes);

app.use('/search', searchRoutes);

app.use('/add-user', addRoutes);

app.get('/', (request, response) => {
	response.render('index', { users: userStore.getUsers() });
});

app.get('/api/search/*', (req, res) => {
  var results = userStore.searchUsers(req.params[0]);
  res.json(results);
});

////this adds a like and stores it in the likes.json
app.post('/like', (request, response) => {
	//The following if statement checks if the clicked
	//property in the likes.json file is false. If it is,
	//a like will be added to the json file and the 
	//clicked property will be changed to true so another
	//like can not be added.
	if(!likeStore.clicked){
	likeStore.likeCount = likeStore.likeCount + 1;
	likeStore.clicked = true;
//what is likeCount?
//likeCount is the object in the likes.json file.
	}

	response.json(likeStore);

	fs.writeFile('likes.json', JSON.stringify(likeStore), (error, data) => {
		if (error) {
			throw error;
		}

		console.log('new attempt to add a likeCount to likes.json');
	});
});
/////

app.listen(3000, function() {
 console.log('Web server started on port 3000');
});
