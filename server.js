// ============================================================
// DEPENDENCIES
// Node Package Modules
// ============================================================

// import Node File System module express - a fast, unopinionated, minimalist web framework
var express = require('express');
// import Node File System module body-parser - body parsing middleware.  It parses incoming request bodies in a middleware before your handlers
var bodyParser = require('body-parser');
// import Node File System module method-override - lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it
var methodOverride = require('method-override');
// create an instance of express by running the express function
var app = express();

// ====================================================
// Serve static content for the app from the "public" directory in the application directory.
// express.static is express's (only) built-in middleware
app.use(express.static(process.cwd() + '/public'));

// returns middleware that parses URL encoded bodies
//
app.use(bodyParser.urlencoded({
	extended: false
}));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// create an instance of express handlebars
// this allows access to the full API
//
var exphbs = require('express-handlebars');

// app.engine(ext, callback) method allows you to create your own template engine
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
// register the template engine
app.set('view engine', 'handlebars');

// local dependency - routes = express.router for all routes
var routes = require('./controllers/burgers_controller.js');
// bind routes to root (WHY IS THIS NEEDED IF WE'VE REQUIRED THE CONTROLLER.JS FILE?)
app.use('/', routes);

var PORT = process.env.PORT || 3306;
app.listen(PORT);