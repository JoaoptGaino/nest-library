import { Module } from '@nestjs/common';
import { GenresService } from './services/genres.service';
import { GenresController } from './controllers/genres.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GenresController],
  providers: [GenresService],
  exports: [GenresService],
})
export class GenresModule {}
