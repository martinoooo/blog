import 'reflect-metadata';
import { useKoaServer } from '@martinoooo/route-plugin';
import { CatsController } from './cats/cats.controller';
import Koa from 'koa';

const app = new Koa();

useKoaServer(app, {
  routers: [CatsController],
});

app.listen(3001);
