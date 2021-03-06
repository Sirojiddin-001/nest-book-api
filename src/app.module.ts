import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { Book } from './books/books.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CategoriesModule } from './categories/categories.module';
import * as path from 'path';
import { Category } from './categories/categories.model';
import { FavoritesModule } from './favorites/favorites.module';
import { Favorite } from './favorites/favorites.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Book, Category, Favorite],
      autoLoadModels: true,
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'files'),
    }),
    UsersModule,
    AuthModule,
    BooksModule,
    CategoriesModule,
    FavoritesModule,
  ],
})

export class AppModule {
}
