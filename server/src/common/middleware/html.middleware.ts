import { Context, Next } from 'koa';

export async function htmlMiddleware(ctx: Context, next: Next) {
  if (ctx.path.startsWith('/api')) {
    await next();
  } else {
    await ctx.render('view', {
      isDev: process.env.NODE_ENV !== 'production',
    });
  }
}
