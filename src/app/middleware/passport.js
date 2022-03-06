const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const localStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = require('./jwt');
const bcrypt = require('bcryptjs');
const user = require('../models/user');
passport.use(new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: JWT_SECRET
}, (payload, done) => {
    try {
        user.findByID(parseInt(payload.sub)).then((user) => {
            if (user.length === 0) {
                return done(null, false);
            }
            var resultArray = Object.values(JSON.parse(JSON.stringify(user)));
            done(null, resultArray[0]);
        }).catch((err) => {
            console.log(err);
        })

    } catch (error) {
        done(error, false);
    }
}));
function compare(password, hashedPassword) {
    // Cannot bcrypt compare when one is undefined
    if (!password || !hashedPassword) {
        return Promise.resolve(false);
    }

    return bcrypt.compare(password, hashedPassword);
}
passport.use(new localStrategy({
    usernameField: 'email',
}, (email, password, done) => {
    try {
        user.findEmail(email).then((user) => {
            if (user.length === 0) {
                return done(null, false);
            }
            var resultArray = Object.values(JSON.parse(JSON.stringify(user)));
            compare(password, resultArray[0].password).then((isCorrect) => {
                if (!isCorrect) done(null, false);
                done(null, resultArray[0]);
            }).catch(error => done(error, false));

        }).catch((err) => {
            console.log(err);
        })
    } catch (error) {
        done(error, false);
    }
}));