import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';

// providers
import { Utils } from '@/providers';

// entities
import { UserEntity } from './modules/user/entities/user.entity';
import { ArticleEntity } from './modules/article/entities/article.entity';

// subscribers
import { UserSubscriber } from './modules/user/entities/user.subscriber';

// modules
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { HealthModule } from './modules/health/health.module';
import { ArticleModule } from './modules/article/article.module';

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
        subscribers: [UserSubscriber],
        entities: [UserEntity, ArticleEntity],
        synchronize: true,
      }),
    }),

    UserModule,
    AuthModule,
    HealthModule,
    ArticleModule,
  ],
  controllers: [],
  providers: [Utils],
})
export class AppModule {}
