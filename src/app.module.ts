import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utils } from '@/core';
import { config } from './config';

// entities
import { UserEntity } from './system/user/entities/user.entity';
import { ArticleEntity } from './demo/article/entities/article.entity';
import { UserArticleEntity } from './demo/user-article/entities/user-article.entity';

// subscribers
import { UserSubscriber } from './system/user/entities/user.subscriber';

// modules
import { AuthModule } from './system/auth/auth.module';
import { UserModule } from './system/user/user.module';
import { HealthModule } from './system/health/health.module';
import { ArticleModule } from './demo/article/article.module';
import { UserArticleModule } from './demo/user-article/user-article.module';

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
        entities: [UserEntity, ArticleEntity, UserArticleEntity],
        synchronize: true,
      }),
    }),

    UserModule,
    AuthModule,
    HealthModule,
    ArticleModule,
    UserArticleModule,
  ],
  controllers: [],
  providers: [Utils],
})
export class AppModule {}
