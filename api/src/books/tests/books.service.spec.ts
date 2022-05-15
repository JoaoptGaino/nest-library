import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getPaginationQueryData } from '../../common/dto';
import { PrismaService } from '../../prisma/services/prisma.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { FindAllBooksDto } from '../dto/find-all-books.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BookEntity } from '../entities/book.entity';
import { BooksService } from '../services/books.service';

describe('BooksService', () => {
  let service: BooksService;

  const mockPrismaService = {
    book: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should call prisma service create with CreateBookDto and the response should be instance of BookEntity', async () => {
    mockPrismaService.book.create = jest.fn().mockResolvedValue({
      id: 'mockId',
      title: 'FightClub',
      authorId: 'mockChuckPalahniukId',
      description: 'You do not talk about FightClub',
      genreId: 'mockDramaId',
      section: 'mockDramaSection',
    });

    const data: CreateBookDto = {
      title: 'FightClub',
      authorId: 'mockChuckPalahniukId',
      description: 'You do not talk about FightClub',
      genreId: 'mockDramaId',
      section: 'mockDramaSection',
    };

    const response = await service.create(data);

    expect(response).toEqual({
      id: 'mockId',
      title: 'FightClub',
      authorId: 'mockChuckPalahniukId',
      description: 'You do not talk about FightClub',
      genreId: 'mockDramaId',
      section: 'mockDramaSection',
    });

    expect(response).toBeInstanceOf(BookEntity);

    expect(mockPrismaService.book.create).toHaveBeenCalledWith({
      data,
      include: BooksService.DEFAULT_INCLUDE,
    });
  });

  it('should call prisma service findMany with FindAllBooksDto and the response should be instance of BookEntity', async () => {
    mockPrismaService.book.findMany = jest.fn().mockResolvedValue([
      {
        id: 'mockId',
        title: 'FightClub',
        authorId: 'mockChuckPalahniukId',
        description: 'You do not talk about FightClub',
        genreId: 'mockDramaId',
        section: 'mockDramaSection',
      },
    ]);

    mockPrismaService.book.count = jest.fn().mockResolvedValue(1);

    const queryDto: FindAllBooksDto = {};

    const response = await service.findAll(queryDto);

    expect(response).toEqual({
      data: [
        {
          id: 'mockId',
          title: 'FightClub',
          authorId: 'mockChuckPalahniukId',
          description: 'You do not talk about FightClub',
          genreId: 'mockDramaId',
          section: 'mockDramaSection',
        },
      ],
      totalCount: 1,
    });

    expect(response.data).toBeInstanceOf(Array);
    expect(response.data[0]).toBeInstanceOf(BookEntity);

    expect(mockPrismaService.book.findMany).toHaveBeenCalledWith({
      ...getPaginationQueryData(queryDto),
      where: {
        authorId: undefined,
        avaiable: undefined,
        description: {
          contains: undefined,
          mode: 'insensitive',
        },
        genreId: undefined,
        section: {
          contains: undefined,
          mode: 'insensitive',
        },
        title: {
          contains: undefined,
          mode: 'insensitive',
        },
      },

      include: BooksService.DEFAULT_INCLUDE,
    });
  });

  it('should call prisma service findUnique with id and the response should be instance of BookEntity', async () => {
    mockPrismaService.book.findUnique = jest.fn().mockResolvedValue({
      id: 'mockId',
      title: 'FightClub',
      authorId: 'mockChuckPalahniukId',
      description: 'You do not talk about FightClub',
      genreId: 'mockDramaId',
      section: 'mockDramaSection',
    });

    const response = await service.findOne('mockId');

    expect(response).toEqual({
      id: 'mockId',
      title: 'FightClub',
      authorId: 'mockChuckPalahniukId',
      description: 'You do not talk about FightClub',
      genreId: 'mockDramaId',
      section: 'mockDramaSection',
    });

    expect(response).toBeInstanceOf(BookEntity);

    expect(mockPrismaService.book.findUnique).toHaveBeenCalledWith({
      where: {
        id: 'mockId',
      },
      include: BooksService.DEFAULT_INCLUDE,
    });
  });

  it('should throw notFoundException if id was not found', async () => {
    mockPrismaService.book.findUnique = jest.fn().mockResolvedValue(null);

    const id = 'mockId';
    await expect(service.findOne(id)).rejects.toThrow(
      new NotFoundException({
        message: `Book not found`,
      }),
    );

    expect(mockPrismaService.book.findUnique).toHaveBeenCalledWith({
      where: {
        id,
      },
      include: BooksService.DEFAULT_INCLUDE,
    });
  });

  it('should call prisma service update with id and the response should be instance of BookEntity', async () => {
    mockPrismaService.book.update = jest.fn().mockResolvedValue({
      id: 'mockId',
      title: 'Tyler didnt allowed to talk about FightClub',
      authorId: 'mockChuckPalahniukId',
      description: 'You do not talk about FightClub',
      genreId: 'mockDramaId',
      section: 'mockDramaSection',
    });

    const data: UpdateBookDto = {
      title: 'Tyler didnt allowed to talk about FightClub',
    };

    const response = await service.update('mockId', data);

    expect(response).toEqual({
      id: 'mockId',
      title: 'Tyler didnt allowed to talk about FightClub',
      authorId: 'mockChuckPalahniukId',
      description: 'You do not talk about FightClub',
      genreId: 'mockDramaId',
      section: 'mockDramaSection',
    });

    expect(response).toBeInstanceOf(BookEntity);

    expect(mockPrismaService.book.update).toHaveBeenCalledWith({
      data,
      where: {
        id: 'mockId',
      },
      include: BooksService.DEFAULT_INCLUDE,
    });
  });

  it('should call prisma service delete with id and the response should be instance of BookEntity', async () => {
    mockPrismaService.book.delete = jest.fn().mockResolvedValue({
      id: 'mockId',
      title: 'Tyler didnt allowed to talk about FightClub',
      authorId: 'mockChuckPalahniukId',
      description: 'You do not talk about FightClub',
      genreId: 'mockDramaId',
      section: 'mockDramaSection',
    });

    const response = await service.remove('mockId');

    expect(response).toEqual({
      id: 'mockId',
      title: 'Tyler didnt allowed to talk about FightClub',
      authorId: 'mockChuckPalahniukId',
      description: 'You do not talk about FightClub',
      genreId: 'mockDramaId',
      section: 'mockDramaSection',
    });

    expect(response).toBeInstanceOf(BookEntity);

    expect(mockPrismaService.book.delete).toHaveBeenCalledWith({
      where: {
        id: 'mockId',
      },
    });
  });
});
