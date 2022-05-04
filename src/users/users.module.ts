import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { AuthModule } from '../auth/auth.module';
import { Book } from '../books/books.model';
import { Favorite } from '../favorites/favorites.model';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Book, Favorite]),
    forwardRef(() => AuthModule),
  ],
  exports: [
    UsersService,
  ],
  controllers: [UsersController],
})
export class UsersModule {
}
