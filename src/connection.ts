import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('api_ngcash', 'postgres', 'postgres', {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: 5432
});

export default sequelize;