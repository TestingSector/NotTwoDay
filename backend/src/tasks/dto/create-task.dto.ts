import { TaskStatus } from '../task.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Испытание углепластика',
  })
  title!: string;

  @ApiProperty({
    example: 'ASTM D7136',
  })
  gost!: string;

  @ApiProperty({
    example: '599c0229-811b-4399-85f4-39517f0a4961',
  })
  creatorId!: string;

  @ApiProperty({
    example: '4 часа',
  })
  estimatedTime!: string;

  @ApiProperty({
    example: true,
    required: false,
  })
  isUrgent?: boolean;

  @ApiProperty({
    enum: TaskStatus,
    required: false,
  })
  status?: TaskStatus;
}
