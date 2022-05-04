import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Book } from '../books/books.model';
import { User } from '../users/users.model';

@Table({ tableName: 'favorites' })
export class Favorite extends Model<Favorite> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Book)
  @Column({ type: DataType.INTEGER })
  bookId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
}