import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'Дмитрий',
  })
  firstName!: string;

  @ApiProperty({
    example: 'Иванов',
  })
  lastName!: string;

  @ApiProperty({
    example: 'Денисович',
    required: false,
  })
  middleName?: string;

  @ApiProperty({
    example: '611',
  })
  laboratory!: string;

  @ApiProperty({
    example: '79991234567',
  })
  phoneNumber!: string;

  @ApiProperty({
    example: 'password123',
  })
  password!: string;
}
