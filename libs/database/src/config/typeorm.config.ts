export default {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  migrationsRun: false,
  entities: ['libs/database/src/entity/*.entity.ts'],
  migrations: ['libs/database/src/migration/*{.ts,.js}'],
  // entities: [entitiesPath],
  cli: {
    migrationsDir: 'libs/database/src/migration',
    entitiesDir: 'libs/database/src/entity',
  },
};
