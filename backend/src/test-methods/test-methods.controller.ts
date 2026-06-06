import { Controller, Get, Post } from '@nestjs/common';

import { TestMethodsService } from './test-methods.service';

@Controller('test-methods')
export class TestMethodsController {
  constructor(private readonly service: TestMethodsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post('seed')
  seed() {
    return this.service.seed();
  }
}
