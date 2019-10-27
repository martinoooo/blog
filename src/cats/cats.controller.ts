import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  Response,
  Render,
} from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
// import { RolesGuard } from '../common/guards/roles.guard';
// import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { join } from 'path';

@Controller()
// @UseGuards(RolesGuard)
// @UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }

  // @Post()
  // @Roles('admin')
  // async create(@Body() createCatDto: CreateCatDto) {
  //   this.catsService.create(createCatDto);
  // }

  // @Get(':id')
  // findOne(
  //   @Param('id', new ParseIntPipe())
  //   id,
  // ) {
  //   // logic
  // }
}
