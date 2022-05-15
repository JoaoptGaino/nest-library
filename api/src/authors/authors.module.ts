import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthorsController } from './controllers/authors.controller';
import { AuthorsService } from './services/authors.service';

@Module({
  imports: [PrismaModule],
  controllers: [AuthorsController],
  providers: [AuthorsService],
  exports: [AuthorsService],
})
export class AuthorsModule {}
