import { Middleware, KoaMiddlewareInterface } from '@martinoooo/route-plugin';

@Middleware({ priority: 4 })
export class HtmlMiddleware implements KoaMiddlewareInterface {
  async use(context, next) {
    const { request } = context;
    const { url } = request;
    if (url.indexOf('/api') !== -1) {
      await next();
    } else {
      await context.render('view');
    }
  }
}
