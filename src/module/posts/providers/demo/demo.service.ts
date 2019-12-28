import { Injectable } from '@nestjs/common';

import { Post } from 'src/module/posts/interface/post.interface';
// 添加了这个装饰器 才是服务
@Injectable()
export class DemoService {
    // 只读属性 post
    // 类型是 Post数组 初始值是一个 空数组
    private readonly posts:Post[]=[]

    // 获取post数据的方法
    // :Post 是返回的数据类型
    findAll():Post[]{
        return this.posts
    }

    // 添加post数据
    create(post:Post){
        // 添加 post类型的数据进去
        console.log(this)
        this.posts.push(post)
    }

}
