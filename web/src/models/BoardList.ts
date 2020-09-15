import {
    Model, Table, PrimaryKey, AutoIncrement, Column, AllowNull, Unique, DataType, CreatedAt, UpdatedAt, ForeignKey
} from 'sequelize-typescript';
import { User } from './User';
import { Board } from './Board';

//映射的表
@Table({
    tableName:'boardList'
})
export class BoardList extends Model<BoardList> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id:number;

    @ForeignKey(()=>User)
    @AllowNull(false)
    @Column({field:'userId'})
    userId:number;

    @ForeignKey(()=>Board)
    @AllowNull(false)
    @Column({field:'boardId'})
    boardId:number;

    @AllowNull(false)
    @Column({
        type:DataType.STRING(255)
    })
    name:string;

    @AllowNull(false)
    @Column
    order:number

    @CreatedAt
    createdAt:Date;
    @UpdatedAt
    updatedAt:Date;
}