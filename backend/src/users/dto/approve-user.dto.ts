import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../user.entity';
export class ApproveUserDto {
  @ApiProperty({
    enum: UserRole,
    example: UserRole.ENGINEER,
    description:
      'guest - Гость, customer - Заказчик, dispatcher - Диспетчер, engineer - Испытатель, admin - Администратор',
  })
  role!: UserRole;
}
