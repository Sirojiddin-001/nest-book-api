import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Books', description: 'Category title' })
  readonly title: string;

  @ApiPropertyOptional({ example: 'Description...', description: 'Category description' })
  readonly description?: string;

  @ApiPropertyOptional({ example: '1', description: 'Sub category parent id' })
  readonly parentId?: number;
}