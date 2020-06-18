const ExerciseQuery = require('./schema');
const UserQuery = require('../users/userScheme');
const timeFilter = require('../utils/timeFilter');

const addExercise = (data) => {
  return new Promise((resolve, reject) => {
    UserQuery.findOne({ _id: data.userId })
      .then((user) => {
        const { description, duration, date } = data;
        const exercise = new ExerciseQuery({ description, duration, date });
        exercise.save((err, savedData) => {
          if (err) reject(err);
          user.log.push(savedData._id);
          user.save((err, userSaved) => {
            if (err) reject(err);
            resolve({
              userId: userSaved._id,
              description: savedData.description,
              duration: savedData.duration,
              date: savedData.date,
              username: userSaved.username,
            });
          });
        });
      })
      .catch(reject);
  });
};

const getLog = (userId, from, to, limit) => {
  console.log(userId);
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
          console.log('df');

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
