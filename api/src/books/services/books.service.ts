import { Prisma } from '.prisma/client';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { getPaginationQueryData } from '../../common/dto';
import { PrismaService } from '../../prisma/services/prisma.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { FindAllBooksDto } from '../dto/find-all-books.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BookEntity } from '../entities/book.entity';

@Injectable()
export class BooksService {
  constructor(private readonly prismaService: PrismaService) {}

  static DEFAULT_INCLUDE = {
    Author: true,
    Genre: true,
  };

  async create(data: CreateBookDto) {
    try {
      const createdBook = await this.prismaService.book.create({
        data,
        include: BooksService.DEFAULT_INCLUDE,
      });

      return new BookEntity(createdBook);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async findAll({
    title,
    description,
    section,
    avaiable,
    authorId,
    genreId,
    ...query
  }: FindAllBooksDto) {
    const where: Prisma.BookWhereInput = {
      title: { contains: title, mode: 'insensitive' },
      description: { contains: description, mode: 'insensitive' },
      section: { contains: section, mode: 'insensitive' },
      avaiable,
      authorId,
      genreId,
    };

    const totalCount = await this.prismaService.book.count({ where });

    const books = await this.prismaService.book.findMany({
      ...getPaginationQueryData(query),
      orderBy: query.sort,
      where,
      include: BooksService.DEFAULT_INCLUDE,
    });

    return {
      totalCount,
      data: books.map((book) => new BookEntity(book)),
    };
  }

  async findOne(id: string) {
    const book = await this.prismaService.book.findUnique({
      where: { id },
      include: BooksService.DEFAULT_INCLUDE,
    });
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return new BookEntity(book, book.Author, book.Genre);
  }

  async update(id: string, data: UpdateBookDto) {
    try {
      const book = await this.prismaService.book.update({
        where: { id },
        data,
        include: BooksService.DEFAULT_INCLUDE,
      });

      if (!book) {
        throw new NotFoundException('Book not found');
      }

      return new BookEntity(book);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async remove(id: string) {
    try {
      const book = await this.prismaService.book.delete({
        where: { id },
      });

      return new BookEntity(book);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
