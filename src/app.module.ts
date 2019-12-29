import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PostsModule } from './module/posts/posts.module';
import { DemoMiddleware } from './core/middlewares/demo.middleware';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { DemoRolesGuard } from './core/guards/demo-roles.guard';
import { LoggingInterceptor } from './core/intereptors/logging.interceptor';

@Module({
  imports: [PostsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      // 注册使用的守卫 为全局
      useClass: DemoRolesGuard,
    },
    {
      provide:APP_INTERCEPTOR,
      // 使用全局拦截器
      useClass:LoggingInterceptor
    }
  ],
})
// 注册中间件
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DemoMiddleware).forRoutes('posts');
  }
}
