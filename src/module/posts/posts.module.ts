import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { DemoService } from './providers/demo/demo.service';

@Module({
    controllers:[PostsController],
    providers:[DemoService]
})
export class PostsModule {}

// 通过模块更好的对代码进行管理
