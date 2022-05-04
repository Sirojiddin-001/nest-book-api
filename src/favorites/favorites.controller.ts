import { Controller, Delete, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import FavoritesSchema from './favorites.schema';
import { CreateBookDto } from '../books/dto/create-book.dto';

@ApiTags('favorites-controller')
@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {
  }

  @ApiOperation({ summary: 'Get favorites list' })
  @ApiOkResponse({ status: 200, schema: FavoritesSchema.getFavoritesList() })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  getFavorites(@Req() req) {
    return this.favoritesService.list(req.user.id, 10, 1);
  }

  @ApiOperation({ summary: 'Add to favorites' })
  @ApiOkResponse({ status: 200, schema: FavoritesSchema.addToFavorites() })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put(':book_id')
  addToFavorite(@Param('book_id') id: number, @Req() req: any) {
    return this.favoritesService.add(req.user.id, id);
  }

  @ApiOperation({ summary: 'Remove from favorites' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':book_id')
  deleteFavorite(@Param('book_id') id: number) {
    return this.favoritesService.delete(id);
  }
}
