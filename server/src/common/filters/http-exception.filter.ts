import { Catch, KoaCatchInterface } from '@martinoooo/route-plugin';

@Catch()
export class HttpExceptionFilter implements KoaCatchInterface {
  async catch(e: any, ctx: any) {
    ctx.status = 500;
    ctx.body = {
      code: '9999',
      message: JSON.stringify(e),
      timestamp: new Date().toISOString(),
      path: ctx.request.url,
    };
  }
}
