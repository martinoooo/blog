import { Catch, KoaCatchInterface } from '@martinoooo/route-plugin';

@Catch()
export class HttpExceptionFilter implements KoaCatchInterface {
  async catch(e: any, ctx: any) {
    console.log(e);
    ctx.body = 'catch handler';
    // try {
    //   // await next();
    // } catch (e) {
    //   console.log(e);
    // }
    // const ctx = host.switchToHttp();
    // const response = ctx.getResponse();
    // const request = ctx.getRequest();
    // const statusCode = exception.getStatus();

    // response.status(statusCode).json({
    //   statusCode,
    //   timestamp: new Date().toISOString(),
    //   path: request.url,
    // });
  }
}
