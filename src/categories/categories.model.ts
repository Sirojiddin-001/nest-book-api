import { Column, DataType, Default, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

interface CategoryCreationAttrs {
  title: string
  description?: string
  parentId?: number
}

@Table({ tableName: 'categories' })
export class Category extends Model<Category, CategoryCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Identifier' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'Books', description: 'Category title' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiPropertyOptional({ example: 'Description...', description: 'Category description' })
  @Column({ type: DataType.STRING, allowNull: true })
  description?: string;

  @ApiPropertyOptional({ example: '1', description: 'Sub category parent id' })
  @HasMany(() => Category, { foreignKey: 'parentId', as: 'subCategory' })
  @Column({ type: DataType.INTEGER, allowNull: true })
  parentId?: number;
}