
/**
 * Module dependencies.
 */
const Datastore = require('nedb');
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var projects = require('./routes/projects');
var notifications = require('./routes/notifications');
var team = require('./routes/team');
var about = require('./routes/about');
var deleteProj = require('./routes/deleteProj');
var login = require('./routes/login');
var newProj = require('./routes/newProj');
var help = require('./routes/help');
var blog = require('./routes/blog');
var create = require('./routes/create');
var subtasks = require('./routes/subtasks');
var settings = require('./routes/settings');
var support = require('./routes/support');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json({limit: '1mb'})); //Protecting the server from being flooded by data
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.view);
app.get('/projects', projects.view);
app.get('/notifications', notifications.view);
app.get('/team', team.view);
app.get('/about', about.view);
app.get('/deleteProj', deleteProj.view);
app.get('/login', login.view);
app.get('/newProj', newProj.view);
app.get('/help', help.view);
app.get('/blog', blog.view);
app.get('/create', create.view);
app.get('/subtasks', subtasks.view);
app.get('/settings', settings.view);
app.get('/support', support.view);

const database = new Datastore('public/data/database.db')
database.loadDatabase();

app.post('/api', (request, response) => {
	console.log('I got a request!');
	console.log(request.body);
	database.insert(request.body);
	response.end();
});
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
