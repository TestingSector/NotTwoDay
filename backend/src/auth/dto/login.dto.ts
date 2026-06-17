import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: '79991234567',
  })
  phoneNumber!: string;

  @ApiProperty({
    example: 'password123',
  })
  password!: string;
}
