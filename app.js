const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');

// string de conexão --> mongodb+srv://adm:NuYAG2bip@clusterapi.2gi31.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const url = config.bd_string;
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true };

mongoose.connect(url, options);
mongoose.set('useUnifiedTopology', true);

mongoose.connection.on('error', (err) => {
    console.log('erro na conexão com o banco de dados: ' + err +' ----------------------------------------------- ');
});

mongoose.connection.on('disconnected', () => {
    console.log('aplicação desconectada do banco de dados!')
});

mongoose.connection.on('connected', () => {
    console.log('aplicação conectada do banco de dados!')
});

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');

app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(3000);

module.exports = app;