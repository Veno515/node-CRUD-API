// test:test999
// mongodb://<dbuser>:<dbpassword>@ds161397.mlab.com:61397/cluster

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb://veino:test999@ds161397.mlab.com:61397/cluster', { useUnifiedTopology: true }
).then(() => {
  console.log('Successfully connected to mlab');
})
.catch((error) => {
  console.log('Unable to connect to mlab');
  console.error(error);
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
  /** add other headers too */
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
