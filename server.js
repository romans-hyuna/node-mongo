const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/apiRouter.js');
const dbUrl = require('./config.js').dbUrl;
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, { useNewUrlParser: true }).catch((err) => {
    console.log(err)
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/', apiRouter);

app.use('/', (req, res) => {
    res.status(404).send('Send request to api router "/api/"')
});

app.use(function(err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).send('Internal server error.');
});

let port = 8080;
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});