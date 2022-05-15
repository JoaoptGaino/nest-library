import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { FindAllAuthorsDto } from '../dto/find-all-authors.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { AuthorsService } from '../services/authors.service';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Author created',
  })
  @ApiBadRequestResponse()
  @ApiBody({ type: CreateAuthorDto })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Authors list' })
  @ApiQuery({ type: FindAllAuthorsDto })
  findAll(@Query() query: FindAllAuthorsDto) {
    return this.authorsService.findAll(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ description: 'Author found' })
  @ApiNotFoundResponse({ description: 'Author not found' })
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ description: 'Author updated' })
  @ApiBadRequestResponse()
  @ApiBody({ type: UpdateAuthorDto })
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ description: 'Author deleted' })
  remove(@Param('id') id: string) {
    return this.authorsService.remove(id);
  }
}
