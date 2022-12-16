import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoute.js';

dotenv.config({ path: '.env' })

const app = express();  

app.use(express.json());

app.use(cors());

app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Server is running.');
});

/** Auth */
app.use('/auth', authRoutes);

/** Connect Database */
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('DB connected successfully.');
}).catch((error) => {
    console.log(error);
});

/** Server */
app.listen(process.env.PORT || 4000, () => {
    console.log('Server is running on PORT 4000');
});