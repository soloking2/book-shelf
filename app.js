const express = require('express');
const chalk = require('chalk');
const path = require('path');
const debug = require('debug')('app');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const session = require('express-session');

const morgan = require('morgan');

const bookRoutes = require('./router/library');
const homeRoute = require('./router/home');
const adminRoutes = require('./router/adminRouter');
const authRoutes = require('./router/authRouter');


const app = express();

const port = process.env.PORT || 5000;


app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(morgan('tiny'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'librarysecrets' }));

// eslint-disable-next-line import/no-unresolved
require('./views/config/passport')(app);

app.use(express.static(path.join(__dirname, '/public')));
app.use(
  '/css',
  express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')),
);
app.use(
  '/css',
  express.static(path.join(__dirname, '/node_modules/font-awesome/css')),
);
app.use(
  '/js',
  express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')),
);
app.use(
  '/js',
  express.static(path.join(__dirname, '/node_modules/jquery/dist')),
);

app.use('/admin', adminRoutes);
app.use(homeRoute);
app.use('/books', bookRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  debug(chalk.green('Listening to port 5000'));
});
