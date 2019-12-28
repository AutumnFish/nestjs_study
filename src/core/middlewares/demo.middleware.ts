import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class DemoMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // 打印内容
    console.log("hello ~~")
    next();
  }
}
