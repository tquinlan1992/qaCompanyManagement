"use strict";

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const serverConstants = require("./constants/server");

const corsOptions = {
  origin: [/.*/],
  credentials: true
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));





app.use('/store', require('./routes/store'));
app.use('/companies', require('./routes/companies'));
app.use('/products', require('./routes/products'));
app.use('/users', require('./routes/users'));

app.get('/', function(req, res) {
    res.json("Hello from the StoreFind Server");
});


const port = serverConstants.API_PORT;
app.listen(port, function(){
  console.log('CORS-enabled web server listening on port '+ port);
});
