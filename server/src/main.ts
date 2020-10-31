import 'reflect-metadata';
import { useKoaServer } from '@martinoooo/route-plugin';
import { CatsController } from './cats/cats.controller';
import Koa from 'koa';
import hbs from 'koa-hbs';
import serve from 'koa-static';
import loadJs from './common/helper/loadJs';
import { HtmlMiddleware } from './common/middleware/html.middleware';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { join } from 'path';

const app = new Koa();

useKoaServer(app, {
  routers: [CatsController],
  middlewares: [
    {
      priority: 1,
      middleware: hbs.middleware({
        viewPath: join(__dirname, '..', 'views'),
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
  catcher: HttpExceptionFilter,
  interceptors: [TransformInterceptor],
});

loadJs();
app.listen(Number(process.env.PORT) || 3000);
