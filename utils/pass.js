'use strict';
import passport from 'passport';
import localStrategy from 'passport-local';
const Strategy = localStrategy.Strategy;
import User from '../models/user.js';
import passportJWT from 'passport-jwt';
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
import bcrypt from 'bcrypt';

// local strategy for username password login
passport.use(
    new Strategy(
        {
            usernameField: 'username',
            passwordField: 'password',
        },
        async (username, password, done) => {
            try {
                const user = await User.findOne({username});
                console.log('Local strategy', user); // result is binary row
                if (user === undefined) {
                    return done(null, false, {message: 'Incorrect username.'});
                }
                if (!(await bcrypt.compare(password, user.password))) {
                    return done(null, false, {message: 'Wrong cretendials.'});
                }
                return done(null, user.toJSON(), {message: 'Logged In Successfully'}); // use spread syntax to create shallow copy to get rid of binary row type
            } catch (err) {
                return done(err);
            }
        }
    )
);

// TODO: JWT strategy for handling bearer token
passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'TOP_SECRET',
        },
        async (jwtPayload, done) => {
            try {
                const user = await User.findById(jwtPayload._id);
                if (user == null) {
                    return done(null, false, {message: 'User not found.'});
                }

                return done(null, user, {message: 'Logged In Successfully'});
            } catch (err) {
                return done(err);
            }
        }
    )
);

export default passport;