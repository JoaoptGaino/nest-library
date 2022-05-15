import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsController } from '../controllers/authors.controller';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { FindAllAuthorsDto } from '../dto/find-all-authors.dto';
import { AuthorsService } from '../services/authors.service';

describe('AuthorsController', () => {
  let controller: AuthorsController;

  const mockAuthorsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorsController],
      providers: [AuthorsService],
    })
      .overrideProvider(AuthorsService)
      .useValue(mockAuthorsService)
      .compile();

    controller = module.get<AuthorsController>(AuthorsController);
  });

  it('should call author service create', () => {
    const data: CreateAuthorDto = {
      name: 'Chuck Palahniuk',
    };

    controller.create(data);

    expect(mockAuthorsService.create).toHaveBeenCalledWith(data);
  });

  it('should call author service findAll', () => {
    const query: FindAllAuthorsDto = {};

    controller.findAll(query);

    expect(mockAuthorsService.findAll).toHaveBeenCalledWith(query);
  });

  it('should call author service findOne', () => {
    const id = 'mockId';

    controller.findOne(id);

    expect(mockAuthorsService.findOne).toHaveBeenCalledWith(id);
  });

  it('should call author service update', () => {
    const id = 'mockId';
    const data: CreateAuthorDto = {
      name: 'Chuck Palahniuk',
    };

    controller.update(id, data);

    expect(mockAuthorsService.update).toHaveBeenCalledWith(id, data);
  });

  it('should call author service remove', () => {
    const id = 'mockId';

    controller.remove(id);

    expect(mockAuthorsService.remove).toHaveBeenCalledWith(id);
  });
});
