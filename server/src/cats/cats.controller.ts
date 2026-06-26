import Router from '@koa/router';
import { CatsService } from './cats.service';

const router = new Router({ prefix: '/api' });
const catsService = new CatsService();

router.get('/articles/list', async (ctx) => {
  ctx.body = await catsService.findList();
});

router.get('/article', async (ctx) => {
  const { name } = ctx.query;
  ctx.body = await catsService.findOne(name);
});

export default router;
