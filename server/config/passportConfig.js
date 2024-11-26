const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');

module.exports = function (passport) {

  passport.use(
    new LocalStrategy(async (username, password, done) => {

      try {
        const user = await User.findOne({ username });
        if (!user) return done(null, false, { message: 'User not found' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return done(null, false, { message: 'Incorrect password' });

        // if (user.is_logged_in) {
        //   return done(null, false, {
        //     message: 'Already logged in from another machine. Request admin approval.'
        //   });

        //}
        // user.is_logged_in = true;
        // await user.save()
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user, done) => {
    //console.log('serialised')
    done(null, user.id)
  });

  passport.deserializeUser(async (id, done) => {
    // console.log('deserialised')
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};
