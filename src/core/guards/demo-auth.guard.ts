import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class DemoAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 返回true 请求通过
    // 返回false 请求不通过
    // return true;
    // return false;
    // 获取请求信息
    const request = context.switchToHttp().getRequest()
    return request.headers['token']==='secret'
  }
}
