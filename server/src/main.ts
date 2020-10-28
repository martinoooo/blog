import 'reflect-metadata';
import { useKoaServer } from '@martinoooo/route-plugin';
import { CatsController } from './cats/cats.controller';
import Koa from 'koa';
import hbs from 'koa-hbs';
import serve from 'koa-static';
import loadJs from './common/helper/loadJs';
import { HtmlMiddleware } from './common/middleware/html.middleware';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { join } from 'path';

const app = new Koa();

useKoaServer(app, {
  routers: [CatsController],
  middlewares: [
    {
      priority: 1,
      middleware: hbs.middleware({
        viewPath: __dirname + '/views',
      }),
    },
    {
      priority: 2,
      middleware: serve(join(__dirname, '../..', 'client/dist')),
    },
    {
      priority: 3,
      middleware: serve(join(__dirname, '../..', 'articles')),
    },
    HtmlMiddleware,
    LoggerMiddleware,
  ],
});

loadJs();
app.listen(3001);
