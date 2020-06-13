import { Injectable, NestMiddleware } from '@nestjs/common';
import { readdirSync } from 'fs';
import { resolve } from 'path';

const defaultView = 'material';

export const pages = readdirSync(resolve(__dirname, '../../../views')).map(p =>
  p.replace('.hbs', ''),
);

@Injectable()
export class HtmlMiddleware implements NestMiddleware {
  use(req, res, next) {
    const { url } = req;
    if (url.indexOf('/api') !== -1) {
      next();
    } else {
      const {
        query: { ui },
      } = req;
      if (ui && pages.find(p => p === ui)) {
        res.render(ui);
      } else {
        res.render(defaultView);
      }
    }
  }
}
