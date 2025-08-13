// src/database/database/database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: parseInt(config.get('DB_PORT', '3306'), 10),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [User, Role, Permission],
        synchronize: false, // use migrations/seed for schema
        migrations: [__dirname + '/../migrations/*{.ts,.js}'],
        logging: false,
      }),
    }),
    TypeOrmModule.forFeature([User, Role, Permission]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
export {}
