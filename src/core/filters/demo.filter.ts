import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class DemoFilter<T> implements ExceptionFilter {
  // 必须要实现catch方法
  catch(exception: HttpException, host: ArgumentsHost) {
    // 获取信息
    const ctx = host.switchToHttp();
    // 获取响应
    const response =  ctx.getResponse();
    // 获取请求
    const request = ctx.getRequest();
    // 获取状态
    const status = exception.getStatus();

    // 响应状态
    response.status(status).json({
      statusCode:status,
      path:request.url
    })
  }
}
