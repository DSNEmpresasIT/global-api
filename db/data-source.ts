import { DataSource, DataSourceOptions } from "typeorm"
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(__dirname, '.env') })

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  entities: ['dist/**/*.entity.{ts,js}'],
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
  migrations: ['dist/db/migrations/*.{ts,js}'],
  logging: true,
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
