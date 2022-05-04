import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './categories.model';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryRepository: typeof Category) {
  }

  async create(dto: CreateCategoryDto) {
    return await this.categoryRepository.create(dto);
  }

  async list() {
    return await this.categoryRepository.findAll({
      where: { parentId: null },
      include: {
        model: this.categoryRepository,
        as: 'subCategory',
      },
    });
  }

  async get(id: number) {
    return await this.categoryRepository.findByPk(id);
  }

  async update(id: number, dto: CreateCategoryDto) {
    const result = await this.categoryRepository.update(dto, { returning: true, where: { id } });
    return result[1];
  }

  async delete(id: number) {
    return await this.categoryRepository.destroy({ where: { id } });
  }
}
