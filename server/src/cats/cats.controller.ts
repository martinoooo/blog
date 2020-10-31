import { Router, Get, Query } from '@martinoooo/route-plugin';
import { CatsService } from './cats.service';

@Router('api')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get('/articles/list')
  async findList(ctx: any) {
    const entries = await this.catsService.findList();
    return entries;
  }

  @Get('/article')
  async findOne(@Query() query: any, ctx: any) {
    const { name } = query;
    const file = await this.catsService.findOne(name);
    return file;
  }
}
