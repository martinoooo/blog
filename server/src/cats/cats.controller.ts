// import {
//   Body,
//   Controller,
//   Get,
//   Param,
//   Post,
//   UseGuards,
//   UseInterceptors,
//   Render,
//   Res,
//   Req,
// } from '@nestjs/common';
import { Router, Get, Query } from '@martinoooo/route-plugin';
// import { Roles } from '../common/decorators/roles.decorator';
// // import { RolesGuard } from '../common/guards/roles.guard';
// import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
// import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CatsService } from './cats.service';
// import { CreateCatDto } from './dto/create-cat.dto';
// import { Cat } from './interfaces/cat.interface';
// import { join } from 'path';
// import { Response, Request } from 'express';

// @UseGuards(RolesGuard)
// @UseInterceptors(TransformInterceptor)
@Router('api')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get('/articles/list')
  async findList(ctx: any) {
    const entries = await this.catsService.findList();
    // return entries;
    ctx.body = entries;
  }

  @Get('/article')
  async findOne(@Query() query: any, ctx: any) {
    const { name } = query;
    const file = await this.catsService.findOne(name);
    ctx.body = file;
    return file;
  }
}
