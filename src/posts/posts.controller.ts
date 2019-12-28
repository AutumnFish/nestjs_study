import { Controller, Get, Req, Query, Header, Headers } from '@nestjs/common';

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

    // 获取请求的值
    @Get('request')
    // @Req 装饰器，获取 请求的所有参数
    request(@Req() request){
        // ip地址
        console.log(request.ip)
        // 查询字符串 
        console.log(request.query)
        // 请求的方法
        console.log(request.method)
        // 响应的内容
        return 'query路由'
    }

    // 获取请求的查询字符串 key=value&key2=value2
    @Get('query')
    query(@Query() query){
        
        return '你发送过来的参数是:'+JSON.stringify(query)
    }

    // 获取提交的头部信息
    @Get('headers')
    headers(@Headers() headers){
        console.log(headers)
        return '获取头部信息'

    }
}
