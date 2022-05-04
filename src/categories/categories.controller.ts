import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('categories-controller')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {
  }

  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({ status: 201, type: CreateCategoryDto })
  @Post()
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @ApiOperation({ summary: 'Get categories list' })
  @ApiResponse({ status: 201, type: CreateCategoryDto })
  @Get()
  getCategories() {
    return this.categoriesService.list();
  }

  @ApiOperation({ summary: 'Get category by id' })
  @ApiResponse({ status: 201, type: CreateCategoryDto })
  @Get(':id')
  getCategory(@Param('id') id: number) {
    return this.categoriesService.get(id);
  }

  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({ status: 201, type: CreateCategoryDto })
  @Put(':id')
  updateCategory(@Param('id') id: number, @Body() dto: CreateCategoryDto) {
    return this.categoriesService.update(id, dto);
  }


  @ApiOperation({ summary: 'Delete category' })
  @Delete(':id')
  deleteCategory(@Param('id') id: number) {
    return this.categoriesService.delete(id);
  }
}
