import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '~/system/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { UserTokenController } from './user-token.controller';
import { UserTokenEntity } from './user-token.entity';
import { UserTokenService } from './user-token.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([UserTokenEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '60s' },
      }),
    }),
    ConfigModule,
  ],
  controllers: [UserTokenController],
  providers: [UserTokenService, JwtStrategy],
  exports: [UserTokenService],
})
export class UserTokenModule {}
