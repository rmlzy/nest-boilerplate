import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '必须填写用户名称' })
  @MinLength(2, { message: '用户名至少包含2个字符' })
  @MaxLength(15, { message: '用户名最多包含15个字符' })
  username: string;

  @IsNotEmpty({ message: '必须填写密码' })
  @MinLength(6, { message: '为了保证账户安全, 请输入至少六位的密码' })
  @MaxLength(18, { message: '为了便于记忆, 密码长度请不要超过十八位' })
  password: string;

  @IsOptional()
  @MinLength(2, { message: '用户昵称至少包含2个字符' })
  @MaxLength(32, { message: '用户昵称最多包含32个字符' })
  realname: string;

  @IsNotEmpty({ message: '必须填写电子邮箱' })
  @IsEmail({}, { message: '电子邮箱格式错误' })
  @MaxLength(256, { message: '电子邮箱最多包含256个字符' })
  email: string;
}
