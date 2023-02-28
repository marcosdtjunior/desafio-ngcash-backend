import './env';
import express, { json } from 'express';
import router from './routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(json());
app.use(router);

app.listen(process.env.PORT,
    () => { console.log("Servidor executando na porta", process.env.PORT) });