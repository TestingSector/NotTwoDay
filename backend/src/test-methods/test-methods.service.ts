import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TestMethod } from './test-method.entity';
import { TEST_METHODS } from './test-methods.data';

@Injectable()
export class TestMethodsService {
  constructor(
    @InjectRepository(TestMethod)
    private readonly repository: Repository<TestMethod>,
  ) {}

  findAll() {
    return this.repository.find({
      order: {
        name: 'ASC',
        standard: 'ASC',
      },
    });
  }

  async seed() {
    await this.repository.clear();

    return this.repository.save(TEST_METHODS);
  }
}
