const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const passport = require('passport');
//const LocalStrategy = require('passport-local').Strategy;  ???
const session = require('express-session');
const routes = require('./routes');


const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


routes(app);

app.listen(3000);

module.exports = app;
