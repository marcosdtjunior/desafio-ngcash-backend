import './env';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME ?? '', process.env.DB_USER ?? '', process.env.DB_PASSWORD ?? '', {
    host: process.env.DB_HOST ?? '',
    dialect: 'postgres',
    port: 5432
});

export default sequelize;