import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class HtmlMiddleware implements NestMiddleware {
  use(req, res, next) {
    const { url } = req;
    if (url.indexOf('/api') !== -1) {
      next();
    } else {
      // TODO: render html in there
      res.render('material');
    }
  }
}
