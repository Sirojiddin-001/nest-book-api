import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Favorite } from '../favorites/favorites.model';
import { User } from '../users/users.model';

@Table({ tableName: 'books' })
export class Book extends Model<Book> {
  @ApiProperty({ example: '1', description: 'Identifier' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'The Hobbit', description: 'Book title' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({ example: 'Written for J.R.R. Tolkien’s ...', description: 'Book description' })
  @Column({ type: DataType.STRING, allowNull: true })
  description: string;

  @ApiProperty({ example: 'J.R.R. Tolkien', description: 'Book author' })
  @Column({ type: DataType.STRING, allowNull: false })
  author: string;

  @ApiProperty({ example: '1937', description: 'Book year' })
  @Column({ type: DataType.INTEGER, allowNull: true })
  year: number;

  @ApiProperty({ example: 'cover.jpg', description: 'Book cover' })
  @Column({ type: DataType.STRING, allowNull: false })
  cover: string;

  @ApiProperty({ example: 'the_hobbit.pdf', description: 'Book file link' })
  @Column({ type: DataType.STRING, allowNull: false })
  link: string;

  @BelongsToMany(() => User, () => Favorite)
  users: User[];
}