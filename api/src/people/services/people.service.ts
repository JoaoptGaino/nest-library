import { Prisma } from '.prisma/client';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { getPaginationQueryData } from '../../common/dto';
import { PrismaService } from '../../prisma/services/prisma.service';
import { CreatePersonDto } from '../dto/create-person.dto';
import { FindAllPeopleDto } from '../dto/find-all-people.dto';
import { UpdatePersonDto } from '../dto/update-person.dto';
import { PersonEntity } from '../entities/person.entity';

@Injectable()
export class PeopleService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: CreatePersonDto) {
    try {
      const person = await this.prismaService.person.create({
        data,
      });

      return new PersonEntity(person);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async findAll({ name, identification, blocked, ...query }: FindAllPeopleDto) {
    const where: Prisma.PersonWhereInput = {
      name: { contains: name, mode: 'insensitive' },
      identification: { contains: identification, mode: 'insensitive' },
      blocked,
    };

    const totalCount = await this.prismaService.person.count({ where });

    const people = await this.prismaService.person.findMany({
      ...getPaginationQueryData(query),
      orderBy: query.sort,
      where,
      include: {
        PersonBookRent: true,
      },
    });

    return {
      totalCount,
      data: people.map(
        ({ PersonBookRent, ...person }) =>
          new PersonEntity(person, PersonBookRent),
      ),
    };
  }

  async findOne(id: string) {
    const person = await this.prismaService.person.findUnique({
      where: { id },
      include: {
        PersonBookRent: true,
      },
    });

    if (!person) {
      throw new NotFoundException(`Person not found`);
    }

    return new PersonEntity(person, person.PersonBookRent);
  }

  async update(id: string, data: UpdatePersonDto) {
    try {
      const updatedPerson = await this.prismaService.person.update({
        where: { id },
        data,
      });

      return new PersonEntity(updatedPerson);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async remove(id: string) {
    try {
      const deletedPerson = await this.prismaService.person.delete({
        where: { id },
      });

      return new PersonEntity(deletedPerson);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
