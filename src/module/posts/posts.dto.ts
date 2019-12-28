import { IsString } from "class-validator"

// 暴露了一个 类，用它来规范提交的数据，
// 但是不遵守格式提交，好像没有问题?
export class PostDataDTO{
    @IsString()
    readonly title:string
    readonly id:string
}