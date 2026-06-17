export class AuthUserDto {
  id!: string;

  firstName!: string;

  lastName!: string;

  middleName?: string;

  laboratory!: string;

  phoneNumber!: string;

  role!: string;

  isApproved!: boolean;

  createdAt!: Date;
}
