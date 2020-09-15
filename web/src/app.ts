import configs from './configs';
import Koa, {Context, Next } from 'koa';
import Router from 'koa-router';
import {bootstrapControllers, Post} from 'koa-ts-controllers';
import path from 'path';
import koaBody from 'koa-body';
import Boom from '@hapi/Boom';
import {Sequelize} from 'sequelize-typescript';
import jwt from 'jsonwebtoken';
import KoaStaticCache from 'koa-static-cache'

(async () => {
    const app = new Koa();

    const router = new Router

    // 静态资源代理
    app.use(KoaStaticCache({
        dir: configs.storage.dir,
        prefix: configs.storage.prefix,
        gzip: true,
        dynamic: true
    }))

    //连接数据库
    const db = new Sequelize({
        ...configs.database,
        models:[__dirname + '/models/**/*']
    });

    app.use( async (ctx: Context, next: Next) => {
        let token = ctx.headers['authorization'];
        if(token) {
            ctx.userInfo = jwt.verify( token, configs.jwt.privateKey ) as UserInfo;
        }
        await next();
    });

    //注册路由
    await bootstrapControllers(app, {
        router,
        basePath:'/api',
        versions:[1],
        controllers:[
            path.resolve(__dirname, 'controllers/**/*' )
        ],
        //统一错误处理
        errorHandler: async (err:any, ctx:Context) => {
            let status = 500;
            let body:any = {
                statusCode: status,
                error: "Internal Server  error",
                message: "An internal server error occurred"
            }
            
            if(err.output) {
                status =  err.output.statusCode;
                body = {...err.output.payload};
                if(err.data) {
                    body.errorDetails = err.data;
                }
            }

            ctx.status = status;
            ctx.body = body;
        }
    });

    router.all('*', async ctx => {
        throw Boom.notFound('没有该路由')
    })

    app.use( koaBody({
        multipart: true,
        formidable: {
            //上传目录
            uploadDir: configs.storage.dir,
            //保存上传后的文件后缀
            keepExtensions: true
        }
    }) );

    app.use( router.routes() );

    app.listen( configs.server.port, configs.server.host, () => {
        console.log(`服务启动成功:http://${configs.server.host}:${configs.server.port}`);
    } )
})();