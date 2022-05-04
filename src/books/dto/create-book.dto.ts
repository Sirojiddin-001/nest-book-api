import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'The Hobbit', description: 'Book title' })
  readonly title: string;

  @ApiPropertyOptional({ example: 'Written for J.R.R. Tolkien’s ...', description: 'Book description' })
  readonly description: string;

  @ApiProperty({ example: 'J.R.R. Tolkien', description: 'Book author' })
  readonly author: string;

  @ApiPropertyOptional({ example: '1937', description: 'Book year' })
  readonly year: number;

  @ApiProperty({ example: '/covers/image.jpg', description: 'Book cover', format: 'binary' })
  readonly cover?: string;

  @ApiProperty({ example: '/books/the_hobbit.pdf', description: 'Book download file', format: 'binary' })
  readonly link?: string;
}

export class UpdateBookDto {
  @ApiProperty({ example: 'The Hobbit', description: 'Book title' })
  readonly title: string;

  @ApiPropertyOptional({ example: 'Written for J.R.R. Tolkien’s ...', description: 'Book description' })
  readonly description: string;

  @ApiProperty({ example: 'J.R.R. Tolkien', description: 'Book author' })
  readonly author: string;

  @ApiPropertyOptional({ example: '1937', description: 'Book year' })
  readonly year: number;

  @ApiPropertyOptional({ example: '/covers/image.jpg', description: 'Book cover', format: 'binary' })
  readonly cover?: string;

  @ApiPropertyOptional({ example: '/books/the_hobbit.pdf', description: 'Book download file', format: 'binary' })
  readonly link?: string;
}