import { DataSource, DataSourceOptions, LoggerOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

dotenv.config();
const dbOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: ['dist/migrations/*{.ts,.js}'],
  // cli: { migrationsDir: 'src/migrations' },
  logging: process.env.DB_LOGGING.split(',') as LoggerOptions,
};
export { dbOptions };

export default new DataSource(dbOptions as DataSourceOptions);
