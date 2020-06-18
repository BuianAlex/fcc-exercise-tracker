const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MLAB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('db ok');
});
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const user = require('./users/service');
const exercise = require('./exercise/service');

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/exercise/new-user', (req, res) => {
  if (req.body.username) {
    user
      .createUser(req.body.username)
      .then((user) => {
        const { username, _id } = user;
        res.json({ username, _id });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.json({ error: 'user was not created' });
  }
});

app.post('/api/exercise/add', (req, res, next) => {
  const { userId, description, duration } = req.body;
  if (!!userId && !!description && !!duration) {
    exercise
      .addExercise(req.body)
      .then((dbRes) => {
        res.send(dbRes);
      })
      .catch((err) => {
        res.status(400).send('FILD_VALIDATION');
      });
  } else {
    res.status(400).send('FILD_VALIDATION');
  }
});

app.get('/api/exercise/log', (req, res, next) => {
  const { userId, from, to, limit } = req.query;
  if (!!userId) {
    exercise
      .getLog(userId, from, to, limit)
      .then((result) => {
        res.send(result);
      })
      .catch(next);
  } else {
    res.status(400).send('Unknown userId');
  }
});

// Not found middleware
app.use((req, res, next) => {
  return next({ status: 404, message: 'not found' });
});

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage;

  if (err.errors) {
    // mongoose validation error
    errCode = 400; // bad request
    const keys = Object.keys(err.errors);
    // report the first validation error
    errMessage = err.errors[keys[0]].message;
  } else {
    // generic or custom error
    errCode = err.status || 500;
    errMessage = err.message || 'Internal Server Error';
  }
  res.status(errCode).type('txt').send(errMessage);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
