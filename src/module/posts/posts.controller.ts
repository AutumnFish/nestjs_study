import {
  Controller,
  Get,
  Req,
  Query,
  Headers,
  Param,
  Post,
  Body,
  HttpException,
  HttpStatus,
  ForbiddenException,
  UseFilters,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  SetMetadata,
  UseInterceptors,
} from '@nestjs/common';
import { PostDataDTO } from './posts.dto';
import { DemoService } from './providers/demo/demo.service';
import { DemoFilter } from 'src/core/filters/demo.filter';
import { DemoAuthGuard } from 'src/core/guards/demo-auth.guard';
import { Roles } from 'src/core/decorator/roles.decorator';
import { LoggingInterceptor } from 'src/core/intereptors/logging.interceptor';
import { TransformInterceptor } from 'src/core/intereptors/transform.interceptor';
import { User } from 'src/core/decorator/user.decorator';
import { DemoPipe } from 'src/core/pipes/demo.pipe';

@Controller('posts')
// 增加守卫
// @UseGuards(DemoAuthGuard)
// @UseFilters(DemoFilter)
// 增加拦截器
// @UseInterceptors(LoggingInterceptor)
export class PostsController {
  // 注入依赖的方法1
  // 定义只读 私有属性
  // private readonly demoService:DemoService

  // 添加构造函数
  // constructor(demoService:DemoService){
  //     // 讲demoService保存为服务
  //     this.demoService = demoService;
  // }

  // 注入依赖的方法2
  // 直接写在构造函数上
  constructor(private readonly demoService: DemoService) {}

  // 异常的接口
  @Get('error')
  // @UseFilters(DemoFilter)
  error() {
    // 状态码 403
    // throw new HttpException("没有权限",HttpStatus.FORBIDDEN)
    throw new ForbiddenException('没有权限');
  }

  // 获取
  @Get('getAll')
  @Roles('member')
  @UseInterceptors(TransformInterceptor)
  getAll(@User('jack',DemoPipe) user:Array<[]> ) {
    console.log('getAll')
    console.log(user)
    // 调用 findAll方法获取所有的数据
    return this.demoService.findAll();
  }
  // 添加
  @Post('create')
  // @SetMetadata('roles',['member'])
  @Roles('member')
  create(@Body() post: PostDataDTO) {
    // 调用 create方法 创建数据
    this.demoService.create(post);
    return 'success';
  }

  // get请求
  @Get('index')
  index() {
    // 字符串直接返回
    // return "postController-index请求";
    // 如果是 对象或者数组 会被自动转换
    return { name: 'jack', age: 18 };
  }

  // 获取请求的值
  @Get('request')
  // @Req 装饰器，获取 请求的所有参数
  request(@Req() request) {
    // ip地址
    console.log(request.ip);
    // 查询字符串
    console.log(request.query);
    // 请求的方法
    console.log(request.method);
    // 响应的内容
    return 'query路由';
  }

  // 获取请求的查询字符串 key=value&key2=value2
  @Get('query')
  query(@Query() query) {
    return '你发送过来的参数是:' + JSON.stringify(query);
  }

  // 获取提交的头部信息
  @Get('headers')
  headers(@Headers() headers) {
    console.log(headers);
    return '获取头部信息';
  }

  // 带参数的路由
  @Get('/params/:id')
  params(@Param() params) {
    return `你发送过来的id是:${params.id}`;
  }

  // Post请求
  @Post('simple')
  // @Body 装饰器 解析body的内容
  simple(@Body() body) {
    console.log(body);
    return body;
  }

  // Post请求 并约定参数
  @Post('dto')
  @UsePipes(ValidationPipe)
  dto(@Body() dto: PostDataDTO) {
    console.log(dto.id);
    console.log(dto.title);
    return '你提交过来的数据是:' + JSON.stringify(dto);
  }
  // 带参数的路由
  @Get('/id/:id')
  // 直接解构出id 并且进行类型转换
  id(@Param('id', ParseIntPipe,DemoPipe) id) {
    console.log(typeof id);
    return `你发送过来的id是:${id}`;
  }
}
