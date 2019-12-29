import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators'
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  // context 可以用来获取 请求的信息
  // next 类似于中间件的 next
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 打印内容
    // console.log('hello i am a interceptor')

    // 获取起始时间
    const now = Date.now()
    return next.handle().pipe(
      tap(()=>{
        console.log(`after... ${Date.now()-now}ms`)
      })
    );
  }
}
