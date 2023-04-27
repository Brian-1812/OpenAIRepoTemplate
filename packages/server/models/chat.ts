import { Optional } from "sequelize";
import {
  Table,
  Model,
  PrimaryKey,
  Column,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { IChat, IUser } from "common-types";
import { DataType } from "sequelize-typescript";
import User from "./user";

interface ChatCreationAttributes
  extends Optional<IChat, "id" | "createdAt" | "response" | "user"> {}

@Table
export default class Chat extends Model<IChat, ChatCreationAttributes> {
  // @PrimaryKey
  // @Column({
  //   type: DataType.UUID,
  //   defaultValue: DataType.UUIDV4,
  // })
  // id!: string;

  @Column({
    type: DataType.TEXT,
  })
  question!: string;

  @Column({
    type: DataType.TEXT("long"),
  })
  response!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}
