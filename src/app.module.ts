import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './config';

// entities
import { UserEntity } from './modules/user/entities/user.entity';

// providers
import { Utils } from './providers';

// modules
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('MYSQL.HOST'),
        port: config.get('MYSQL.PORT'),
        username: config.get('MYSQL.USERNAME'),
        password: config.get('MYSQL.PASSWORD') as string,
        database: config.get('MYSQL.DATABASE') as string,
        entities: [UserEntity],
        synchronize: true,
      }),
    }),

    UserModule,
    AuthModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService, Utils],
})
export class AppModule {}
