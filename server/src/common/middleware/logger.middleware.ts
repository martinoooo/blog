import { Middleware, KoaMiddlewareInterface } from '@martinoooo/route-plugin';

@Middleware({ priority: 5 })
export class LoggerMiddleware implements KoaMiddlewareInterface {
  async use(context: any, next: any) {
    console.log(`Request...`);
    const now = Date.now();
    await next();
    console.log(`end ${Date.now() - now}ms`);
  }
}
