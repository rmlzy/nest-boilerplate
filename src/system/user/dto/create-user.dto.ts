import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '必须填写用户名称' })
  @MinLength(2, { message: '用户名至少包含2个字符' })
  @MaxLength(15, { message: '用户名最多包含15个字符' })
  username: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '必须填写密码' })
  @MinLength(6, { message: '为了保证账户安全, 请输入至少六位的密码' })
  @MaxLength(18, { message: '为了便于记忆, 密码长度请不要超过十八位' })
  password: string;

  @ApiPropertyOptional({ description: '昵称, 默认取用户名' })
  @IsOptional()
  @MinLength(2, { message: '用户昵称至少包含2个字符' })
  @MaxLength(32, { message: '用户昵称最多包含32个字符' })
  realname: string;

  @ApiProperty({ description: '邮箱' })
  @IsNotEmpty({ message: '必须填写电子邮箱' })
  @IsEmail({}, { message: '电子邮箱格式错误' })
  @MaxLength(256, { message: '电子邮箱最多包含256个字符' })
  email: string;
}
