import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './books.model';
import { CreateBookDto } from './dto/create-book.dto';
import sequelize, { Op } from 'sequelize';
import paginator from '../utils/paginator';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book) private bookRepository: typeof Book) {
  }

  async create(dto: CreateBookDto, files: { cover?: Express.Multer.File[], link?: Express.Multer.File[] }) {
    const cover = `/covers/${files.cover[0].filename}`;
    const link = `/books/${files.link[0].filename}`;
    return await this.bookRepository.create({ ...dto, cover, link });
  }

  async list(limit?: number, page?: number, search?: string) {
    const options = {
      where: {},
      attributes: {
        include: [[sequelize.literal(`(
          SELECT "users->favorites"."bookId" is NOT NULL AS "isFavorite"
          FROM "books" AS "Book" LEFT OUTER JOIN
          ("favorites" AS "users->favorites" INNER JOIN "users" AS "users" ON "users"."id" = "users->favorites"."userId")
          ON "Book"."id" = "users->favorites"."bookId" AND "users"."id" = 4
        )`), 'isFavorite',
        ]],
        exclude: ['description', 'link'],
      },
    };
    if (search) options.where = { title: { [Op.iLike]: `%${search}%` } };
    return await paginator(this.bookRepository, limit, page, options);
  }

  async get(id: number) {
    return await this.bookRepository.findByPk(id);
  }

  async update(id: number, dto: CreateBookDto, files: { cover?: Express.Multer.File[], link?: Express.Multer.File[] }) {
    const cover = files?.cover && `/covers/${files?.cover[0]?.filename}`;
    const link = files?.link && `/books/${files?.link[0]?.filename}`;
    const result = await this.bookRepository.update({ ...dto, cover, link }, { returning: true, where: { id } });
    return result[1];
  }

  async delete(id: number) {
    return await this.bookRepository.destroy({ where: { id } });
  }
}
