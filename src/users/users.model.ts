import { BelongsToMany, Column, DataType, Default, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Book } from '../books/books.model';
import { Favorite } from '../favorites/favorites.model';

interface UserCreationAttrs {
  fullName: string
  email: string
  password: string
  role: string
}

type RoleStatus = 'USER' | 'ADMIN';

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Identifier' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'John Smith', description: 'User full name' })
  @Column({ type: DataType.STRING, allowNull: false })
  fullName: string;

  @ApiProperty({ example: 'user@email.com', description: 'User email' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @ApiProperty({ example: '12345678', description: 'User password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'USER|ADMIN', description: 'User role' })
  @Default('USER')
  @Column(DataType.ENUM('USER', 'ADMIN'))
  role: RoleStatus;

  @BelongsToMany(() => Book, () => Favorite)
  books: Book[];
}