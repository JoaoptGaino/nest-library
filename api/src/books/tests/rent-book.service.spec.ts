import { Test, TestingModule } from '@nestjs/testing';
import { transformDatetimeToDate } from '../../utils/date-formatters';
import { PrismaService } from '../../prisma/services/prisma.service';
import { RentBookDto } from '../dto/rent-book.dto';
import { RentBookService } from '../services/rent-book.service';
import { InternalServerErrorException } from '@nestjs/common';

describe('RentBookService', () => {
  let service: RentBookService;

  const mockPrismaService = {
    book: {
      update: jest.fn(),
      findUnique: jest.fn(),
    },
    personBookRent: {
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RentBookService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    service = module.get<RentBookService>(RentBookService);
  });

  it('should call book update and set it as unavaiable and create personBookRent', async () => {
    const date = new Date();
    mockPrismaService.book.findUnique = jest.fn().mockResolvedValue({
      id: 'mockId',
      title: 'FightClub',
      authorId: 'mockChuckPalahniukId',
      description: 'You do not talk about FightClub',
      genreId: 'mockDramaId',
      avaiable: true,
      section: 'mockDramaSection',
    });

    mockPrismaService.book.update = jest.fn().mockResolvedValue({
      id: 'mockId',
      title: 'FightClub',
      authorId: 'mockChuckPalahniukId',
      description: 'You do not talk about FightClub',
      genreId: 'mockDramaId',
      avaiable: false,
      section: 'mockDramaSection',
    });

    const data: RentBookDto = {
      days: 5,
      personId: 'mockPersonId',
    };

    await service.rent('mockId', data);

    expect(mockPrismaService.book.update).toHaveBeenCalledWith({
      data: {
        avaiable: false,
      },
      where: {
        id: 'mockId',
      },
    });

    expect(mockPrismaService.personBookRent.create).toHaveBeenCalledWith({
      data: {
        personId: data.personId,
        bookId: 'mockId',
        rentedDay: transformDatetimeToDate(date),
        expireDay: transformDatetimeToDate(
          new Date(date.setDate(date.getDate() + data.days)),
        ),
      },
    });
  });

  it('should throw internal server error if book is not available', async () => {
    mockPrismaService.book.findUnique = jest.fn().mockResolvedValue({
      id: 'mockId',
      title: 'FightClub',
      authorId: 'mockChuckPalahniukId',
      description: 'You do not talk about FightClub',
      genreId: 'mockDramaId',
      avaiable: false,
      section: 'mockDramaSection',
    });

    const data: RentBookDto = {
      days: 5,
      personId: 'mockPersonId',
    };

    await expect(service.rent('mockId', data)).rejects.toThrow(
      new InternalServerErrorException({
        message: 'Book is not available',
      }),
    );
  });
});
