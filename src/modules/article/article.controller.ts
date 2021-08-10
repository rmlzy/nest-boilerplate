import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController, Logged } from '@/core';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@ApiTags('文章')
@Controller('article')
export class ArticleController extends BaseController {
  constructor(private readonly articleService: ArticleService) {
    super();
  }

  @ApiOperation({ description: '创建文章' })
  @Post()
  @Logged()
  async create(@Body() createArticleDto: CreateArticleDto) {
    const res = await this.articleService.create(createArticleDto);
    return this.success(res);
  }

  @ApiOperation({ description: '查询文章列表' })
  @Get()
  async findAll() {
    const res = await this.articleService.findAll();
    return this.success(res);
  }

  @ApiOperation({ description: '文章详情' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.articleService.findOne(id);
    return this.success(res);
  }

  @ApiOperation({ description: '更新文章' })
  @Patch(':id')
  @Logged()
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    const res = await this.articleService.update(id, updateArticleDto);
    return this.success(res);
  }

  @ApiOperation({ description: '删除文章' })
  @Delete(':id')
  @Logged()
  async remove(@Param('id') id: string) {
    const res = await this.articleService.remove(id);
    return this.success(res);
  }
}
