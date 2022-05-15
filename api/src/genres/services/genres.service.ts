import { Prisma } from '.prisma/client';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { getPaginationQueryData } from '../../common/dto';
import { PrismaService } from '../../prisma/services/prisma.service';
import { CreateGenreDto } from '../dto/create-genre.dto';
import { FindAllGenresDto } from '../dto/find-all-genres.dto';
import { UpdateGenreDto } from '../dto/update-genre.dto';
import { GenreEntity } from '../entities/genre.entity';

@Injectable()
export class GenresService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: CreateGenreDto) {
    try {
      const createdGenre = await this.prismaService.genre.create({
        data,
      });

      return new GenreEntity(createdGenre);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async findAll({ name, ...query }: FindAllGenresDto) {
    const where: Prisma.GenreWhereInput = {
      name: { contains: name, mode: 'insensitive' },
    };

    const totalCount = await this.prismaService.genre.count({ where });

    const genres = await this.prismaService.genre.findMany({
      ...getPaginationQueryData(query),
      orderBy: query.sort,
      where,
    });

    return {
      totalCount,
      data: genres.map((genre) => new GenreEntity(genre)),
    };
  }

  async findOne(id: string) {
    const genre = await this.prismaService.genre.findUnique({
      where: { id },
    });
    if (!genre) {
      throw new NotFoundException({
        message: 'Genre not found',
      });
    }

    return new GenreEntity(genre);
  }

  async update(id: string, data: UpdateGenreDto) {
    try {
      const updatedGenre = await this.prismaService.genre.update({
        where: { id },
        data,
      });

      return new GenreEntity(updatedGenre);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async remove(id: string) {
    try {
      const deletedGenre = await this.prismaService.genre.delete({
        where: { id },
      });

      return new GenreEntity(deletedGenre);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
