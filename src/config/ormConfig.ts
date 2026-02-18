import { join } from "path";
import { DataSourceOptions } from "typeorm";
require('dotenv').config({ path: '.env' });

export const ormConfig: DataSourceOptions = {
    type: 'sqlite',
    database: process.env.DB_NAME as string, //nao aceita undefined
    entities: [join(__dirname, '../entity/*.entity{.ts,.js}')],
    logging: true,
    synchronize: true,
}