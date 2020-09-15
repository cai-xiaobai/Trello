import {
    Model, Table, PrimaryKey, AutoIncrement, Column, AllowNull, Unique, DataType, CreatedAt, UpdatedAt, ForeignKey, Default
} from 'sequelize-typescript';
import { User } from './User';

//映射的表
@Table({
    tableName:'attachment'
})
export class Attachment extends Model<Attachment> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id:number;

    @ForeignKey(()=>User)
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
    userId:number;

    @AllowNull(false)
    @Unique
    @Column({
        type:DataType.STRING(255)
    })
    originName:string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    type: string;

    @Default(0)
    @AllowNull(false)
    @Column
    size:number;

    @CreatedAt
    createdAt:Date;
    @UpdatedAt
    updatedAt:Date;
}