import { Controller, Get } from '@nestjs/common';

@Controller('posts')
export class PostsController {
    // get请求
    @Get('index')
    index(){
        // 字符串直接返回
        // return "postController-index请求";
        // 如果是 对象或者数组 会被自动转换
        return {name:'jack',age:18}
    }
}
