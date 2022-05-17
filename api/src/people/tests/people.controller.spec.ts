import { Test, TestingModule } from '@nestjs/testing';
import { PeopleController } from '../controllers/people.controller';
import { PeopleService } from '../services/people.service';

describe('PeopleController', () => {
  let controller: PeopleController;

  const mockPeopleService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [PeopleService],
    })
      .overrideProvider(PeopleService)
      .useValue(mockPeopleService)
      .compile();

    controller = module.get<PeopleController>(PeopleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
