const moment = require('moment');
const ExerciseQuery = require('./schema');
const UserQuery = require('../users/userScheme');
const timeFilter = require('../utils/timeFilter');

const addExercise = (data) => {
  return new Promise((resolve, reject) => {
    UserQuery.findOne({ _id: data.userId })
      .then((user) => {
        let { description, duration, date } = data;
        const dateObj = new Date(date);
        if (isNaN(dateObj.getTime())) {
          date = moment().format('YYYY-MM-DD');
        }
        const exercise = new ExerciseQuery({ description, duration, date });
        exercise.save((err, savedData) => {
          if (err) reject(err);
          user.log.push(savedData._id);

          user.save((err, userSaved) => {
            if (err) reject(err);
            resolve({
              _id: userSaved._id,
              username: userSaved.username,
              date: moment(savedData.date).format('ddd MMM DD YYYY'),
              duration: savedData.duration,
              description: savedData.description,
            });
          });
        });
      })
      .catch((err) => {
        console.log('re');

        reject(new Error());
      });
  });
};

const getLog = (userId, from, to, limit) => {
  return new Promise((resolve, reject) => {
    UserQuery.findOne({ _id: userId })
      .populate('log')
      .then((user) => {
        if (!user) reject(new Error('userId not found'));
        let exercise = [...user.log];
        const filterREsult = timeFilter(exercise, from, to);
        if (Array.isArray(filterREsult)) {
          exercise = timeFilter(exercise, from, to);
        } else {
          reject(new Error(filterREsult));
        }
        if (!!limit) {
          let buf = [...exercise];
          const maxShow = limit <= exercise.length ? limit : exercise.length;
          exercise = buf.slice(0, maxShow);
        }
        resolve({
          userId: user._id,
          username: user.username,
          count: exercise.length,
          log: exercise,
        });
      });
  });
};

module.exports = { addExercise, getLog };
