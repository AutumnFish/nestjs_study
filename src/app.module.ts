import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PostsModule } from './module/posts/posts.module';
import { DemoMiddleware } from './core/middlewares/demo.middleware';

@Module({
  imports: [PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
// 注册中间件
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DemoMiddleware).forRoutes("posts")
  }
}
