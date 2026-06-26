import { Context, Next } from 'koa';

export async function loggerMiddleware(_ctx: Context, next: Next) {
  console.log('Request...');
  const now = Date.now();
  await next();
  console.log(`end ${Date.now() - now}ms`);
}
