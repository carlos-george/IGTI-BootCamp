import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import requireDir from 'require-dir';
import mongoose from 'mongoose';

import routes from './routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

requireDir('./models');

// Iniciando banco de dados
mongoose.connect(process.env.MONGO_URL!,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });


const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => console.log(`#### Server is running on port: ${PORT} ####`));