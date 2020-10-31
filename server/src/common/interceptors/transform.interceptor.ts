import { Interceptor, KoaInterCeptorInterface } from '@martinoooo/route-plugin';

@Interceptor()
export class TransformInterceptor implements KoaInterCeptorInterface {
  intercept(content: any) {
    return {
      code: 200,
      message: 'success',
      data: content,
    };
  }
}
