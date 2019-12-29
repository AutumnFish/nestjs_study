import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { read } from 'fs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class DemoRolesGuard implements CanActivate {
  constructor(private readonly reflector:Reflector){}


  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // return false
    // return true;
    const req = context.switchToHttp().getRequest();
    // 获取请求的类
    // console.log('class', context.getClass());
    // 获取请求的处理器
    // console.log('handler', context.getHandler());
    // 通过反射获取 设置的 roles
    const roles = this.reflector.get<string[]>('roles',context.getHandler());
    console.log(roles)

    return req.headers['token'] === 'secret';
  }
}
