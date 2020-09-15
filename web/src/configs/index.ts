import databaseConfig from './database.json';
import path from 'path'

interface IDatabaseConfig {
    username:string;
    password:string;
    database:string;
    host:string;
    dialect:'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'mariadb';
    timezone:string;
}

const configs = {
    development:{
        server: {
            host:'localhost',
            port: 8080
        },
        database:databaseConfig.development as IDatabaseConfig,
        jwt: {
            privateKey: 'Trello'
        },
        storage: {
            dir: path.resolve(__dirname, '../attachments'),
            prefix: '/public/attachments'
        }
    },
    test:{
        server: {
            host:'localhost',
            port: 8080
        },
        database:databaseConfig.test as IDatabaseConfig,
        jwt: {
            privateKey: 'Trello'
        },
        storage: {
            dir: path.resolve(__dirname, '../attachments'),
            prefix: '/public/attachments'
        }
    },
    production:{
        server: {
            host:'localhost',
            port: 8080
        },
        database:databaseConfig.production as IDatabaseConfig,
        jwt: {
            privateKey: 'Trello'
        },
        storage: {
            dir: path.resolve(__dirname, '../attachments'),
            prefix: '/public/attachments'
        }
    },
};
//声明一个类型 约束 NODE_EVN
type configKeys = keyof typeof configs;

// process 读取当前运行环境的相关一些信息
const NODE_EVN = process.env.NODE_ENV as configKeys || 'development'; //NODE_ENV环境变量的值

export default configs[NODE_EVN]