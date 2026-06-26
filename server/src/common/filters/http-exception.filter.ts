import { Context, Next } from 'koa';

export async function httpExceptionFilter(ctx: Context, next: Next) {
  try {
    await next();
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      code: '9999',
      message: JSON.stringify(e),
      timestamp: new Date().toISOString(),
      path: ctx.request.url,
    };
  }
}
