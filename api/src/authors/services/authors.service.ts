import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/services/prisma.service';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { FindAllAuthorsDto } from '../dto/find-all-authors.dto';
import { AuthorEntity } from '../entities/author.entity';
import { Prisma } from '.prisma/client';
import { getPaginationQueryData } from '../../common/dto';

@Injectable()
export class AuthorsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateAuthorDto) {
    try {
      const createdAuthor = await this.prismaService.author.create({
        data,
      });

      return new AuthorEntity(createdAuthor);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async findAll({ name, ...query }: FindAllAuthorsDto) {
    const where: Prisma.AuthorWhereInput = {
      name: {
        contains: name,
        mode: 'insensitive',
      },
    };

    const totalCount = await this.prismaService.author.count({ where });

    const authors = await this.prismaService.author.findMany({
      ...getPaginationQueryData(query),
      orderBy: query.sort,
      where,
    });

    return {
      totalCount,
      data: authors.map((author) => new AuthorEntity(author)),
    };
  }

  async findOne(id: string) {
    const author = await this.prismaService.author.findUnique({
      where: { id },
    });

    if (!author) {
      throw new NotFoundException({
        message: 'Author not found',
      });
    }

    return new AuthorEntity(author);
  }

  async update(id: string, data: UpdateAuthorDto) {
    try {
      const updatedAuthor = await this.prismaService.author.update({
        where: { id },
        data,
      });

      return new AuthorEntity(updatedAuthor);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async remove(id: string) {
    try {
      const deletedAuthor = await this.prismaService.author.delete({
        where: { id },
      });

      return new AuthorEntity(deletedAuthor);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
