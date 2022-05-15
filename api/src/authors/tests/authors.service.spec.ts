import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getPaginationQueryData } from '../../common/dto';
import { PrismaService } from '../../prisma/services/prisma.service';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { FindAllAuthorsDto } from '../dto/find-all-authors.dto';
import { AuthorEntity } from '../entities/author.entity';
import { AuthorsService } from '../services/authors.service';

describe('AuthorsService', () => {
  let service: AuthorsService;

  const mockPrismaService = {
    author: {
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
      providers: [AuthorsService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    service = module.get<AuthorsService>(AuthorsService);
  });

  it('should call prisma service create with CreateAuthorDTO and the response should be an instance of AuthorEntity', async () => {
    mockPrismaService.author.create = jest.fn().mockResolvedValue({
      id: 'mockId',
      name: 'Chuck Palahniuk',
    });

    const data: CreateAuthorDto = {
      name: 'Chuck Palahniuk',
    };

    const response = await service.create(data);

    expect(response).toEqual({
      id: 'mockId',
      name: 'Chuck Palahniuk',
    });

    expect(response).toBeInstanceOf(AuthorEntity);

    expect(mockPrismaService.author.create).toHaveBeenCalledWith({
      data,
    });
  });

  it('should call prisma service findMany with queryDto and the response should be and array instance of AuthorEntity and count', async () => {
    mockPrismaService.author.findMany = jest.fn().mockResolvedValue([
      {
        id: 'mockId',
        name: 'Chuck Palahniuk',
      },
    ]);

    mockPrismaService.author.count = jest.fn().mockResolvedValue(1);

    const queryDto: FindAllAuthorsDto = {};

    const response = await service.findAll(queryDto);

    expect(response).toEqual({
      data: [
        {
          id: 'mockId',
          name: 'Chuck Palahniuk',
        },
      ],
      totalCount: 1,
    });

    expect(response.data).toBeInstanceOf(Array);
    expect(response.data[0]).toBeInstanceOf(AuthorEntity);

    expect(mockPrismaService.author.findMany).toHaveBeenCalledWith({
      ...getPaginationQueryData(queryDto),
      where: {
        name: {
          contains: queryDto.name,
          mode: 'insensitive',
        },
      },
    });
  });

  it('should call prisma service findUnique with id and the response should be an instance of AuthorEntity', async () => {
    mockPrismaService.author.findUnique = jest.fn().mockResolvedValue({
      id: 'mockId',
      name: 'Chuck Palahniuk',
    });

    const id = 'mockId';

    const response = await service.findOne(id);

    expect(response).toEqual({
      id: 'mockId',
      name: 'Chuck Palahniuk',
    });

    expect(response).toBeInstanceOf(AuthorEntity);

    expect(mockPrismaService.author.findUnique).toHaveBeenCalledWith({
      where: {
        id,
      },
    });
  });

  it('should throw notFoundException if id was not found', async () => {
    mockPrismaService.author.findUnique = jest.fn().mockResolvedValue(null);

    const id = 'mockId';

    await expect(service.findOne(id)).rejects.toThrow(
      new NotFoundException({
        message: 'Author not found',
      }),
    );

    expect(mockPrismaService.author.findUnique).toHaveBeenCalledWith({
      where: {
        id,
      },
    });
  });

  it('should call prisma service update with id and data and the response should be an instance of AuthorEntity', async () => {
    mockPrismaService.author.update = jest.fn().mockResolvedValue({
      id: 'mockId',
      name: 'Chuck Palahniuk',
    });

    const id = 'mockId';

    const data: CreateAuthorDto = {
      name: 'Chuck Palahniuk',
    };

    const response = await service.update(id, data);

    expect(response).toEqual({
      id: 'mockId',
      name: 'Chuck Palahniuk',
    });

    expect(response).toBeInstanceOf(AuthorEntity);

    expect(mockPrismaService.author.update).toHaveBeenCalledWith({
      data,
      where: {
        id,
      },
    });
  });

  it('should call prisma service remove with id and should return the deleted data as instance of AuthorEntity', async () => {
    mockPrismaService.author.delete = jest.fn().mockResolvedValue({
      id: 'mockId',
      name: 'Chuck Palahniuk',
    });

    const id = 'mockId';

    const response = await service.remove(id);

    expect(response).toEqual({
      id: 'mockId',
      name: 'Chuck Palahniuk',
    });

    expect(response).toBeInstanceOf(AuthorEntity);

    expect(mockPrismaService.author.delete).toHaveBeenCalledWith({
      where: {
        id,
      },
    });
  });
});
