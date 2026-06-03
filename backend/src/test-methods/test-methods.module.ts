import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestMethod } from './test-method.entity';
import { TestMethodsService } from './test-methods.service';
import { TestMethodsController } from './test-methods.controller';

@Module({
    imports: [TypeOrmModule.forFeature([TestMethod])],
    providers: [TestMethodsService],
    controllers: [TestMethodsController],
    exports: [TestMethodsService],
})
export class TestMethodsModule { }