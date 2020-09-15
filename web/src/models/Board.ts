import {
    Model, Table, PrimaryKey, AutoIncrement, Column, AllowNull, Unique, DataType, CreatedAt, UpdatedAt, ForeignKey
} from 'sequelize-typescript';
import { User } from './User';

//映射的表
@Table({
    tableName:'board'
})
export class Board extends Model<Board> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id:number;

    @ForeignKey(()=>User)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull:false
    })
    userId:number;

    @AllowNull(false)
    @Column({
        type:DataType.STRING(255)
    })
    name:string;

    @CreatedAt
    createdAt:Date;
    @UpdatedAt
    updatedAt:Date;
}