import { Optional } from "sequelize";
import {
  Table,
  Model,
  PrimaryKey,
  Column,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import { IUser } from "common-types";
import { DataType } from "sequelize-typescript";

interface UserCreationAttributes extends Optional<IUser, "id" | "createdAt"> {}

@Table
export default class User extends Model<IUser, UserCreationAttributes> {
  // @PrimaryKey
  // @Column({
  //   type: DataType.UUID,
  //   defaultValue: DataType.UUIDV4,
  // })
  // id!: string;

  @Column({
    type: DataType.STRING,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
  })
  phoneNumber?: string;

  @Column({
    type: DataType.STRING,
  })
  name?: string;

  @Column({
    type: DataType.TEXT,
    get(): string[] {
      return JSON.parse(this.getDataValue("files"));
    },
    set(val: string[]) {
      this.setDataValue("files", JSON.stringify(val));
    },
  })
  files?: string[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}

// User.prototype.toJSON = function () {
//   const values = Object.assign({}, this.get());

//   return values;
// };
