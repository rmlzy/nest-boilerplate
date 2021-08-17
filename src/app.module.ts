import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '~/config';
import { Utils } from '~/core';
import { ArticleModule } from '~/demo/article/article.module';
import { UserArticleModule } from '~/demo/user-article/user-article.module';
import { AccessModule } from '~/system/access/access.module';
import { HealthModule } from '~/system/health/health.module';
import { RoleAccessModule } from '~/system/role-access/role-access.module';
import { RoleModule } from '~/system/role/role.module';
import { UserTokenModule } from '~/system/user-token/user-token.module';
import { UserModule } from '~/system/user/user.module';
import { UserRoleModule } from './system/user-role/user-role.module';

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
        logging: Utils.isDevelop() ? true : ['error'],
        type: 'mysql',
        host: config.get('MYSQL.HOST'),
        port: config.get('MYSQL.PORT'),
        username: config.get('MYSQL.USERNAME'),
        password: config.get('MYSQL.PASSWORD') as string,
        database: config.get('MYSQL.DATABASE') as string,
        subscribers: ['dist/**/*.subscriber.js'],
        entities: ['dist/**/*.entity.js'],
        synchronize: true,
      }),
    }),

    HealthModule,
    UserModule,
    UserTokenModule,
    ArticleModule,
    UserArticleModule,
    RoleModule,
    AccessModule,
    RoleAccessModule,
    UserRoleModule,
  ],
  controllers: [],
  providers: [Utils],
})
export class AppModule {}
