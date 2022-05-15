import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getPaginationQueryData } from '../../common/dto';
import { PrismaService } from '../../prisma/services/prisma.service';
import { CreateGenreDto } from '../dto/create-genre.dto';
import { FindAllGenresDto } from '../dto/find-all-genres.dto';
import { GenreEntity } from '../entities/genre.entity';
import { GenresService } from '../services/genres.service';

describe('GenresService', () => {
  let service: GenresService;

  const mockPrismaService = {
    genre: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenresService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    service = module.get<GenresService>(GenresService);
  });

  it('should call prisma service create with CreateGenreDTO and the response should be instance of GenreEntity', async () => {
    mockPrismaService.genre.create = jest.fn().mockResolvedValue({
      id: 'mockId',
      name: 'Drama',
    });

    const data: CreateGenreDto = {
      name: 'Drama',
    };

    const response = await service.create(data);

    expect(response).toEqual({
      id: 'mockId',
      name: 'Drama',
    });

    expect(response).toBeInstanceOf(GenreEntity);

    expect(mockPrismaService.genre.create).toHaveBeenCalledWith({
      data,
    });
  });

  it('should call prisma service findMany with queryDto and the response should be instance of GenreEntity', async () => {
    mockPrismaService.genre.findMany = jest.fn().mockResolvedValue([
      {
        id: 'mockId',
        name: 'Drama',
      },
    ]);

    mockPrismaService.genre.count = jest.fn().mockResolvedValue(1);
    const queryDto: FindAllGenresDto = {};

    const response = await service.findAll(queryDto);

    expect(response).toEqual({
      data: [
        {
          id: 'mockId',
          name: 'Drama',
        },
      ],
      totalCount: 1,
    });

    expect(response.data).toBeInstanceOf(Array);
    expect(response.data[0]).toBeInstanceOf(GenreEntity);

    expect(mockPrismaService.genre.findMany).toHaveBeenCalledWith({
      ...getPaginationQueryData(queryDto),
      where: {
        name: { contains: queryDto.name, mode: 'insensitive' },
      },
    });
  });

  it('should call prisma service findUnique with queryDto and the response should be instance of GenreEntity', async () => {
    mockPrismaService.genre.findUnique = jest.fn().mockResolvedValue({
      id: 'mockId',
      name: 'Drama',
    });

    const id = 'mockId';

    const response = await service.findOne(id);

    expect(response).toEqual({
      id: 'mockId',
      name: 'Drama',
    });

    expect(response).toBeInstanceOf(GenreEntity);

    expect(mockPrismaService.genre.findUnique).toHaveBeenCalledWith({
      where: {
        id,
      },
    });
  });

  it('should throw notFoundException if id was not found', async () => {
    mockPrismaService.genre.findUnique = jest.fn().mockResolvedValue(null);

    const id = 'mockId';

    await expect(service.findOne(id)).rejects.toThrow(
      new NotFoundException({
        message: 'Genre not found',
      }),
    );

    expect(mockPrismaService.genre.findUnique).toHaveBeenCalledWith({
      where: {
        id,
      },
    });
  });

  it('should call prisma service update with id and data and the response should be instance of GenreEntity', async () => {
    mockPrismaService.genre.update = jest.fn().mockResolvedValue({
      id: 'mockId',
      name: 'Drama',
    });

    const id = 'mockId';
    const data: CreateGenreDto = {
      name: 'Drama',
    };

    const response = await service.update(id, data);

    expect(response).toEqual({
      id: 'mockId',
      name: 'Drama',
    });

    expect(response).toBeInstanceOf(GenreEntity);

    expect(mockPrismaService.genre.update).toHaveBeenCalledWith({
      data,
      where: {
        id,
      },
    });
  });

  it('should call prisma service remove with id and should return the deleted data as instance of GenreEntity', async () => {
    mockPrismaService.genre.delete = jest.fn().mockResolvedValue({
      id: 'mockId',
      name: 'Drama',
    });

    const id = 'mockId';

    const response = await service.remove(id);

    expect(response).toEqual({
      id: 'mockId',
      name: 'Drama',
    });

    expect(response).toBeInstanceOf(GenreEntity);

    expect(mockPrismaService.genre.delete).toHaveBeenCalledWith({
      where: {
        id,
      },
    });
  });
});
