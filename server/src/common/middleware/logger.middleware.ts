import { Middleware, KoaMiddlewareInterface } from '@martinoooo/route-plugin';

@Middleware({ priority: 5 })
export class LoggerMiddleware implements KoaMiddlewareInterface {
  async use(context: any, next: () => void) {
    console.log(`Request...`);
    next();
  }
}
