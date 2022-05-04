import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Favorite } from './favorites.model';
import { User } from '../users/users.model';
import { Book } from '../books/books.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [
    SequelizeModule.forFeature([Favorite, User, Book]),
    AuthModule
  ],
})
export class FavoritesModule {
}
