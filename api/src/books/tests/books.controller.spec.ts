import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from '../controllers/books.controller';
import { CreateBookDto } from '../dto/create-book.dto';
import { FindAllBooksDto } from '../dto/find-all-books.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BooksService } from '../services/books.service';

describe('BooksController', () => {
  let controller: BooksController;

  const mockBooksService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    })
      .overrideProvider(BooksService)
      .useValue(mockBooksService)
      .compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should call book service create', () => {
    const data: CreateBookDto = {
      title: 'FightClub',
      authorId: 'mockChuckPalahniukId',
      description: 'You do not talk about FightClub',
      genreId: 'mockDramaId',
      section: 'mockDramaSection',
    };

    controller.create(data);

    expect(mockBooksService.create).toHaveBeenCalledWith(data);
  });

  it('should call book service findAll', () => {
    const query: FindAllBooksDto = {};

    controller.findAll(query);

    expect(mockBooksService.findAll).toHaveBeenCalledWith(query);
  });

  it('should call book service findOne', () => {
    const id = 'mockId';

    controller.findOne(id);

    expect(mockBooksService.findOne).toHaveBeenCalledWith(id);
  });

  it('should call book service update', () => {
    const id = 'mockId';
    const data: UpdateBookDto = {
      title: 'Tyler didnt allowed to talk about FightClub',
    };

    controller.update(id, data);

    expect(mockBooksService.update).toHaveBeenCalledWith(id, data);
  });

  it('should call book service remove', () => {
    const id = 'mockId';

    controller.remove(id);

    expect(mockBooksService.remove).toHaveBeenCalledWith(id);
  });
});
