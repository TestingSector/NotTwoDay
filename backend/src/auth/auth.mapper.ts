import { User } from '../users/user.entity';
import { AuthUserDto } from './dto/auth-user.dto';

export const toAuthUserDto = (user: User): AuthUserDto => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  middleName: user.middleName,
  laboratory: user.laboratory,
  phoneNumber: user.phoneNumber,
  role: user.role,
  isApproved: user.isApproved,
  createdAt: user.createdAt,
});
