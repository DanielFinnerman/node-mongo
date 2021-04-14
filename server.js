'use strict';
import dotenv from 'dotenv';
import pkg from 'apollo-server-express';
const {ApolloServer} = pkg;
import schemas from './schemas/index.js';
import resolvers from './resolvers/index.js';
import express from 'express';
import connectMongo from './db/db.js';
import {chargemapRoute} from './routes/chargemapRoute.js';
import {authRoute} from './routes/authRoute.js';
import {chargemapSecretRoute} from './routes/chargemapSecretRoute.js';
import {userRoute} from './routes/userRoute.js';
import passport from './utils/pass.js';
import helmet from 'helmet';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
    helmet({
        ieNoOpen: false,
        contentSecurityPolicy: false,
    })
);

app.use('/chargemap', chargemapRoute);
app.use(
    '/chargemap',
    passport.authenticate('jwt', {session: false}),
    chargemapSecretRoute
);
app.use('/auth', authRoute);
app.use('/user', userRoute);

const checkAuth = (req, res) => {
    try {
        return new Promise((resolve, reject) => {
            passport.authenticate(
                'jwt',
                {
                    session: false,
                },
                (err, user, info) => {
                    if (!user) {
                        resolve(false);
                    }
                    resolve(user);
                }
            )(req, res);
        });
    } catch (err) {
        throw err;
    }
};

(async () => {
    try {
        const conn = await connectMongo();
        if (conn) {
            console.log('Connected successfully.');
        }
        const server = new ApolloServer({
            typeDefs: schemas,
            resolvers,
            context: async ({req, res}) => {
                if (req) {
                    const user = await checkAuth(req, res);

                    return {
                        req,
                        res,
                        user,
                    };
                }
            },
        });

        server.applyMiddleware({app});

        process.env.DEPLOY_ENVI = process.env.DEPLOY_ENVI || 'development';
        if (process.env.DEPLOY_ENVI === 'production') {
            console.log('prduction');
            const {default: production} = await import('./sec/production.js');
            production(app, 3000);
        } else {
            console.log('localhost');
            const {default: localhost} = await import('./sec/localhost.js');
            localhost(app, 8000, 3000);
        }
    } catch (e) {
        throw e;
    }
})()