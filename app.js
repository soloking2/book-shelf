const express = require('express');
const chalk = require('chalk');
const path = require('path');

const debug = require('debug')('app');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/query/dist')))

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(5000, () => {
    debug(chalk.green('Listening to port 5000'));
})