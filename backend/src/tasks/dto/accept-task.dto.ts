import { ApiProperty } from '@nestjs/swagger';

export class AcceptTaskDto {
  @ApiProperty({
    example: '599c0229-811b-4399-85f4-39517f0a4961',
  })
  executorId!: string;
}
