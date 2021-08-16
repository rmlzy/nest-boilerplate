import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: '用户名', default: 'admin' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: '密码', default: '123456' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
