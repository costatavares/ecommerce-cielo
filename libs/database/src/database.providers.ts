import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';


// console.log(typeOrmConfig as TypeOrmModuleOptions);

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + '/entity/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migration/*.migration{.ts,.js}'],
        cli: {
          migrationsDir: 'database/migration',
          entitiesDir: 'database/entity',
        },
        synchronize: true,
      }),
  },
];

// npx typeorm -f libs/database/src/config/database.providers.ts migration:generate -n PostRefactoring