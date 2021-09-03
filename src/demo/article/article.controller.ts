import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Logged, UserId, Utils } from '~/core';
import { UserArticleService } from '~/demo/user-article/user-article.service';
import { CreateArticleDto, UpdateArticleDto } from './article.dto';
import { ArticleService } from './article.service';

@ApiTags('文章')
@ApiHeader({ name: 'token' })
@Controller('article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly userArticleService: UserArticleService,
  ) {}

  @ApiOperation({ description: '创建文章' })
  @Post()
  @Logged()
  async create(
    @UserId() userId: string,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    const data = await this.articleService.create(+userId, createArticleDto);
    return Utils.success(data);
  }

  @ApiOperation({ description: '查询文章列表' })
  @Get()
  async findAll(@UserId() userId: string) {
    const data = await this.userArticleService.findArticlesByUserId(userId);
    return Utils.success(data);
  }

  @ApiOperation({ description: '文章详情' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.articleService.findOne(+id);
    return Utils.success(data);
  }

  @ApiOperation({ description: '更新文章' })
  @Patch(':id')
  @Logged()
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    const data = await this.articleService.update(+id, updateArticleDto);
    return Utils.success(data);
  }

  @ApiOperation({ description: '删除文章' })
  @Delete(':id')
  @Logged()
  async remove(@UserId() userId: string, @Param('id') articleId: number) {
    const data = await this.articleService.remove(+userId, articleId);
    return Utils.success(data);
  }
}
