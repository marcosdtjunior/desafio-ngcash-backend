import './env';
import { Sequelize } from 'sequelize';
import pg from 'pg';

const sequelize = new Sequelize(process.env.DB_NAME ?? '', process.env.DB_USER ?? '', process.env.DB_PASSWORD ?? '', {
    host: process.env.DB_HOST ?? '',
    dialect: 'postgres',
    dialectModule: pg,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: true,
            ca: process.env.DB_CA ?? ''
        }
    }
});

export default sequelize;