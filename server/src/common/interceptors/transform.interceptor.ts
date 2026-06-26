import { Context, Next } from 'koa';

export async function transformInterceptor(ctx: Context, next: Next) {
  await next();
  if (ctx.body != null) {
    ctx.body = {
      code: 200,
      message: 'success',
      data: ctx.body,
    };
  }
}
