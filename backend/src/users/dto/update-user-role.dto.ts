import { ApiProperty } from '@nestjs/swagger';

import { UserRole } from '../user.entity';

export class UpdateUserRoleDto {
  @ApiProperty({
    enum: UserRole,
    example: UserRole.TESTER,
  })
  role!: UserRole;
}
