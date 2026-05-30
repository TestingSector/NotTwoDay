import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'Дмитрий',
  })
  firstName?: string;

  @ApiPropertyOptional({
    example: 'Иванов',
  })
  lastName?: string;

  @ApiPropertyOptional({
    example: 'Денисович',
  })
  middleName?: string;

  @ApiPropertyOptional({
    example: '611',
  })
  laboratory?: string;

  @ApiPropertyOptional({
    example: '+79991234567',
  })
  phoneNumber?: string;
}
