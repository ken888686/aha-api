import {
  Get,
  Body,
  Controller,
  HttpStatus,
  NotAcceptableException,
  Param,
  Post,
  UsePipes,
  ValidationError,
  ValidationPipe,
  ParseArrayPipe,
  Query,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todo')
// @UsePipes(new ValidationPipe({ disableErrorMessages: true }))
export class TodoController {
  @Post()
  // @UsePipes(ValidationPipe)
  // @UsePipes(
  //   new ValidationPipe({
  //     exceptionFactory: (errors: ValidationError[]) => {
  //       return new NotAcceptableException({
  //         code: HttpStatus.NOT_ACCEPTABLE,
  //         message: '格式錯誤!!',
  //         errors,
  //       });
  //     },
  //   }),
  // )
  // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(@Body() dto: CreateTodoDto) {
    console.log(dto);

    return {
      id: 1,
      ...dto,
    };
  }

  @Post('/trans/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  trans(@Param('id') id: number): { id: number } {
    return {
      id,
    };
  }

  @Post('/arr')
  parseArr(
    @Body(new ParseArrayPipe({ items: CreateTodoDto })) dtos: CreateTodoDto[],
  ) {
    return dtos;
  }

  @Get('/query')
  getQuery(
    @Query('ids', new ParseArrayPipe({ items: Number, separator: ',' }))
    ids: number[],
  ) {
    return ids;
  }
}
