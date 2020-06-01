import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import session from 'express-session';
import morgan from 'morgan';

import './db';
import mainRouter from './router/main';
import { configs } from './config';

const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(
    session({
        secret: configs.cookieSecret,
        resave: true,
        saveUninitialized: false,
    }),
);

app.set('jwt-secret', configs.cookieSecret);

app.use(mainRouter);

export default app;
