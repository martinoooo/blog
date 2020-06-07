import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  Render,
  Res,
  Req,
} from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
// import { RolesGuard } from '../common/guards/roles.guard';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { join } from 'path';
import { Response, Request } from 'express';

@Controller('api')
// @UseGuards(RolesGuard)
@UseInterceptors(TransformInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // @Post()
  // @Roles('admin')
  // async create(@Body() createCatDto: CreateCatDto) {
  //   this.catsService.create(createCatDto);
  // }

  @Get('/articles/list')
  async findList() {
    const entries = await this.catsService.findList();
    return entries;
  }

  @Get('/article')
  async findOne(@Req() request: Request) {
    const { name } = request.query;
    const file = await this.catsService.findOne(name);
    return file;
  }
}