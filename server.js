import 'dotenv/config';
import {log} from 'console';

import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';

import users from './routes/api/users.js'

const app = express();

// -Connect Database
await connectDB();
// log('After connect');

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json());

// - Routes
app.use('/api/users', users);

// - Server Settings
const port = process.env.PORT || 5000;

// - Listen
app.listen(port, () => {
    log(`Server runnin at http://localhost:${port}`)
})