import {
    Model, Table, PrimaryKey, AutoIncrement, Column, AllowNull, Unique, DataType, CreatedAt, UpdatedAt, ForeignKey, HasMany
} from 'sequelize-typescript';
import { User } from './User';
import { Board } from './Board';
import { CardAttachment } from './CardAttachment';
import { Comment } from './Comment';
 
//映射的表
@Table({
    tableName:'boardlistcard'
})
export class BoardListCard extends Model<BoardListCard> {

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
    @Column({field:'boardListId'})
    boardListId:number;

    @AllowNull(false)
    @Column({
        type:DataType.STRING(255)
    })
    name:string;

    @AllowNull(false)
    @Column({
        type:DataType.STRING(2000)
    })
    description:string;

    @Column({
        type:DataType.FLOAT,
        defaultValue: 0
    })
    order:number;

    @HasMany(()=> CardAttachment)
    attachments: CardAttachment[];

    @HasMany(()=> Comment)
    comments: Comment[];

    @CreatedAt
    createdAt:Date;
    @UpdatedAt
    updatedAt:Date;
}