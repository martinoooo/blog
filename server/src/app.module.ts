import { Scope } from '@martinoooo/dependency-injection';
import Koa from 'koa';

@Scope({
  providers: [Koa],
})
export class AppModule {
  constructor(private app: Koa) {}

  init() {
    this.app.use(async (ctx) => {
      ctx.body = 'Hello World';
    });
    this.app.listen(3001);
  }
}
