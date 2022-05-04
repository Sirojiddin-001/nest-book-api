import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { BooksService } from './books.service';
import { CreateBookDto, UpdateBookDto } from './dto/create-book.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import BooksSchema from './schema/books.schema';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('book-controller')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {
  }

  @ApiOperation({ summary: 'Create book' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, type: CreateBookDto })
  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'cover', maxCount: 1 },
    { name: 'link', maxCount: 1 },
  ]))
  createBook(@Body() dto: CreateBookDto, @UploadedFiles() files: { cover?: Express.Multer.File[], link?: Express.Multer.File[] }) {
    return this.booksService.create(dto, files);
  }

  @ApiOperation({ summary: 'Get book list' })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'search', type: 'string', required: false })
  @ApiOkResponse({ status: 200, schema: BooksSchema.getAllBooks() })
  @Get()
  getAllBooks(@Query('limit') limit?: number, @Query('page') page?: number, @Query('search') search?: string) {
    return this.booksService.list(limit, page, search);
  }

  @ApiOperation({ summary: 'Get book by id' })
  @ApiOkResponse({ status: 200, schema: BooksSchema.getBook() })
  @Get(':id')
  getBook(@Param('id') id: number) {
    return this.booksService.get(id);
  }

  @ApiOperation({ summary: 'Update book' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateBookDto })
  @ApiOkResponse({ status: 200, schema: BooksSchema.getBook() })
  @Patch(':id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'cover', maxCount: 1 },
    { name: 'link', maxCount: 1 },
  ]))
  updateBook(
    @Param('id') id: number,
    @Body() dto: UpdateBookDto,
    @UploadedFiles() files?: { cover?: Express.Multer.File[], link?: Express.Multer.File[] }) {
    return this.booksService.update(id, dto, files);
  }

  @ApiOperation({ summary: 'Delete book' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteBook(@Param('id') id: number) {
    return this.booksService.delete(id);
  }
}
