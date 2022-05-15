import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GenresService } from '../services/genres.service';
import { CreateGenreDto } from '../dto/create-genre.dto';
import { UpdateGenreDto } from '../dto/update-genre.dto';
import { FindAllGenresDto } from '../dto/find-all-genres.dto';
import { ApiBody, ApiQuery } from '@nestjs/swagger';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @ApiBody({ type: CreateGenreDto })
  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.create(createGenreDto);
  }

  @ApiQuery({ name: 'name', required: false })
  @Get()
  findAll(@Query() query: FindAllGenresDto) {
    return this.genresService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genresService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genresService.update(id, updateGenreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genresService.remove(id);
  }
}
