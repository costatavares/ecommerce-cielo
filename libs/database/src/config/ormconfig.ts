import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

import * as database from '../entity';
const entities = (Object.keys(database) as Array<keyof typeof database>).map(
  (entity: keyof typeof database) => database[entity],
);

const config: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  migrationsRun: false,
  entities,
  logging: process.env.NODE_ENV === 'local',
  migrations: [join(__dirname, '../migration/*.ts')],
  cli: {
    migrationsDir: 'libs/database/src/migration',
    entitiesDir: 'libs/database/src/entity',
  },
};

export default config;

// /home/anderson/mjv/mini-ecommerce/libs/database/src/entity/user.entity.ts
// dist/apps/mini-ecommerce
