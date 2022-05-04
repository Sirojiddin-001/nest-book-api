import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from './books.model';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as uuid from 'uuid';
import { User } from '../users/users.model';
import { Favorite } from '../favorites/favorites.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [BooksService],
  controllers: [BooksController],
  imports: [
    SequelizeModule.forFeature([Book, User, Favorite]),
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          if (file.fieldname === 'cover') {
            cb(null, './files/covers');
          } else if (file.fieldname === 'link') {
            cb(null, './files/books');
          } else {
            cb(null, './files');
          }
        },
        filename: (req, file, cb) => {
          cb(null, `${uuid.v4()}${path.extname(file.originalname)}`);
        },
      }),
    }),
    AuthModule
  ],
})
export class BooksModule {
}
