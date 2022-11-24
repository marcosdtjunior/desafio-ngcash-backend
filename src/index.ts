import './env';
import express, { json } from 'express';
import router from './routes';

const app = express();

app.use(json());
app.use(router);

app.listen(process.env.PORT,
    () => { console.log("Servidor executando na porta", process.env.PORT) });