import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class DemoMiddleware implements NestMiddleware {
  // 在请求和响应之间增加执行的逻辑
  use(req: any, res: any, next: () => void) {
    // 打印内容
    console.log("hello ~~")


    // 获取设置用户信息
    req.user = {
      roles:[
        'guest'
      ]
    }

    // 判断token
    if(req.headers("token")==='secret'){
      req.user={
        roles:[
          'member'
        ]
      }
    }

    next();
  }
}
