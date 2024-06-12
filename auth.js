const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const person = require('./models/Person');

passport.use(new localStrategy(async (username, password, done) => {
    try {
        const user = await person.findOne({ username: username });

        if (!user) {
            return done(null, false, { message: "Incorrect UserName" })
        } else {
            const passwordMatch = await user.comparePassword(password);
            if (passwordMatch) {
                return done(null, user)
            } else {
                return done(null, false, { message: "Incorrect Password" });
            }
        }
    } catch (error) {
        return done(error);
    }
}))

module.exports = passport;