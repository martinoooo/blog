import Koa from 'koa';
import render from '@koa/ejs';
import { join } from 'path';
import serve from 'koa-static';
import { htmlMiddleware } from './common/middleware/html.middleware';
import { loggerMiddleware } from './common/middleware/logger.middleware';
import { httpExceptionFilter } from './common/filters/http-exception.filter';
import { transformInterceptor } from './common/interceptors/transform.interceptor';
import catsRouter from './cats/cats.controller';

const app = new Koa();

render(app, {
  root: join(__dirname, '..', 'views'),
  layout: false,
  viewExt: 'ejs',
});

app.use(serve(join(__dirname, '../..', 'client/src')));
app.use(serve(join(__dirname, '../..', 'client/dist')));
app.use(serve(join(__dirname, '../..', 'client'), { index: 'none' }));
app.use(serve(join(__dirname, '../..', 'articles')));

app.use(httpExceptionFilter);
app.use(htmlMiddleware);
app.use(loggerMiddleware);
app.use(transformInterceptor);

app.use(catsRouter.routes());
app.use(catsRouter.allowedMethods());

app.listen(Number(process.env.PORT) || 8080);
