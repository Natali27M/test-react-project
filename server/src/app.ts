import express from 'express';
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createConnection } from 'typeorm';

import { apiRouter } from './routes';
import { config } from './configs';

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(apiRouter);

// @ts-ignore
global.rootDir = __dirname;

const { PORT } = config;

app.listen(PORT, async () => {
    console.log(`Serves has started on PORT:${PORT}`);

    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
