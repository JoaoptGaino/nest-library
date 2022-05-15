import { Test, TestingModule } from '@nestjs/testing';
import { GenresController } from '../controllers/genres.controller';
import { CreateGenreDto } from '../dto/create-genre.dto';
import { FindAllGenresDto } from '../dto/find-all-genres.dto';
import { UpdateGenreDto } from '../dto/update-genre.dto';
import { GenresService } from '../services/genres.service';

describe('GenresController', () => {
  let controller: GenresController;

  const mockGenresService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenresController],
      providers: [GenresService],
    })
      .overrideProvider(GenresService)
      .useValue(mockGenresService)
      .compile();

    controller = module.get<GenresController>(GenresController);
  });

  it('should call genre service create', () => {
    const data: CreateGenreDto = {
      name: 'Drama',
    };

    controller.create(data);

    expect(mockGenresService.create).toHaveBeenCalledWith(data);
  });

  it('should call genre service findAll', () => {
    const query: FindAllGenresDto = {};

    controller.findAll(query);

    expect(mockGenresService.findAll).toHaveBeenCalledWith(query);
  });

  it('should call genre service findOne', () => {
    const id = 'mockId';

    controller.findOne(id);

    expect(mockGenresService.findOne).toHaveBeenCalledWith(id);
  });

  it('should call genre service update', () => {
    const id = 'mockId';
    const data: UpdateGenreDto = {
      name: 'Drama',
    };

    controller.update(id, data);

    expect(mockGenresService.update).toHaveBeenCalledWith(id, data);
  });

  it('should call genre service remove', () => {
    const id = 'mockId';

    controller.remove(id);

    expect(mockGenresService.remove).toHaveBeenCalledWith(id);
  });
});
