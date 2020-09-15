import { Controller, Get, Params, Query, Post, Body, Header, Ctx } from 'koa-ts-controllers'
import {Context} from 'koa';
import {IsNumberString} from 'class-validator';
import Boom from '@hapi/Boom';

class GetUsersQuery {
    @IsNumberString()
    page: number
}

@Controller('/test')
class TestController {
    
    @Get('/hello')
    async hello(a: any) {
        // console.log(a.b)
        return 'Hello Test!';
    }

    // @Get('/user/:id(\\d+)')
    // async getUser(
    //     @Params('id') id : number
    // ){
    //     return '当前params中的用户id是：' + id ;
    // }

    // @Get('/user')
    // async getUser2(
    //     @Query() q: {id: number}
    // ) {
    //     return '当前params中的用户id是：' + q.id ;
    // }

    @Post('/user')
    async postUser(
        @Body() body: {
            name:string;
            password: string
        },
        @Header() h: any
    ) {
        console.log('header', h);
        return `当前提交的数据是： ${JSON.stringify(body)}`;
    }

    @Get('/users')
    async getUsers(
        @Query() q: GetUsersQuery
    ) {

        //业务逻辑出现了一些错误，比如用户不存在，用户名已经被注册了
        if(true) {
            throw Boom.notFound('注册失败','用户已经被注册了');
        }
        return '传过来的query：' + JSON.stringify(q) ;
    }

    @Get('/auth')
    async auth(
        @Ctx() ctx: Context
    ) {
        ctx.userInfo
    }
}