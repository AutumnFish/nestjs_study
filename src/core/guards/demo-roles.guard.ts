import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { read } from 'fs';

@Injectable()
export class DemoRolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // return false
    // return true;
    const req = context.switchToHttp().getRequest()

    return req.headers['token']==='secret'
  }
}
