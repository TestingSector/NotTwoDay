import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: '599c0229-811b-4399-85f4-39517f0a4961',
  })
  creatorId!: string;

  @ApiProperty({
    example: 'NTZ',
  })
  type!: string;

  @ApiProperty({
    example: '17160-630-26',
    required: false,
  })
  number?: string;

  @ApiProperty({
    example: 'ВКУ-39',
  })
  materialName!: string;

  @ApiProperty({
    example: '0080-23-23 от 18.02.2023',
    required: false,
  })
  topic?: string;

  @ApiProperty({
    example: 'Растяжение',
  })
  testMethod!: string;

  @ApiProperty({
    example: 'ASTM D3039',
  })
  standard!: string;

  @ApiProperty({
    example: [
      {
        temperature: 20,
        quantity: 6,
        modulus: true,
      },
      {
        temperature: 120,
        quantity: 6,
        modulus: true,
      },
    ],
  })
  temperatureConditions!: {
    temperature: number;
    quantity: number;
    modulus: boolean;
  }[];

  @ApiProperty({
    example: false,
    required: false,
  })
  isUrgent?: boolean;

  @ApiProperty({
    required: false,
  })
  urgentReason?: string;

  @ApiProperty({
    example: 'Дополнительный комментарий',
    required: false,
  })
  comment?: string;
}
