import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  //   synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  //   logging: process.env.DATABASE_LOGGING === 'true',
  //   entities: ['dist/**/*.entity.js'],
  //   migrations: ['dist/migrations/*.js'],
  //   cli: {
  //     migrationsDir: 'src/migrations',
  //   },
}));
