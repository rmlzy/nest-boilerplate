import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '@/system/user/user.module';
import { UserTokenService } from './user-token.service';
import { UserTokenController } from './user-token.controller';
import { UserTokenEntity } from './entities/user-token.entity';
import { JwtStrategy } from './jwt.strategy';

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