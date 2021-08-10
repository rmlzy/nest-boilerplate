import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({ description: '标题' })
  @IsNotEmpty({ message: '必须填写标题' })
  @MinLength(2, { message: '标题至少包含2个字符' })
  @MaxLength(15, { message: '标题最多包含15个字符' })
  title: string;

  @ApiProperty({ description: '正文' })
  @IsNotEmpty({ message: '必须填写正文' })
  @MinLength(2, { message: '正文至少包含2个字符' })
  @MaxLength(1024, { message: '正文最多包含1024个字符' })
  content: string;
}
