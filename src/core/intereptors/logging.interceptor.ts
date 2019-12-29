import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  // context 可以用来获取 请求的信息
  // next 类似于中间件的 next
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 打印内容
    console.log('hello i am a interceptor')
    return next.handle();
  }
}
