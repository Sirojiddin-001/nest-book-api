import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Favorite } from './favorites.model';

@Injectable()
export class FavoritesService {
  constructor(@InjectModel(Favorite) private favoriteRepository: typeof Favorite) {
  }

  async add(userId: number, bookId: number) {
    return await this.favoriteRepository.create({ userId, bookId });
  }

  async list(userId: number, limit: number, page: number) {
    const l = limit || 10;
    const p = page || 1;
    const o = (p - 1) * l;

    const [res] = await this.favoriteRepository.sequelize.query(
      `SELECT
               count("books"."id") AS "count"
          FROM 
              "users" AS "User" 
          LEFT OUTER JOIN ( 
              "favorites" AS "books->favorites" 
          INNER JOIN 
              "books" AS "books" 
          ON  "books"."id" = "books->favorites"."bookId") 
          ON  "User"."id" = "books->favorites"."userId" 
          WHERE "User"."id" = ${userId}
          LIMIT ${l} OFFSET ${o};`,
    );

    const [row] = await this.favoriteRepository.sequelize.query(
      `SELECT
              "books"."id" AS "id",
              "books"."title" AS "title",
              "books"."author" AS "author", 
              "books"."year" AS "year", 
              "books"."cover" AS "cover", 
              "books"."createdAt" AS "createdAt", 
              "books"."updatedAt" AS "updatedAt"
          FROM 
              "users" AS "User" 
          LEFT OUTER JOIN ( 
              "favorites" AS "books->favorites" 
          INNER JOIN 
              "books" AS "books" 
          ON  "books"."id" = "books->favorites"."bookId") 
          ON  "User"."id" = "books->favorites"."userId" 
          WHERE "User"."id" = ${userId}
          LIMIT ${l} OFFSET ${o};`,
    );

    const { count }: any = res[0];
    return {
      pagination: {
        total: Number(count),
        pageCount: Math.ceil(Number(count) / l),
        currentPage: p,
      },
      content: row,
    };
  }

  async delete(bookId: number) {
    return await this.favoriteRepository.destroy({ where: { bookId } });
  }
}
