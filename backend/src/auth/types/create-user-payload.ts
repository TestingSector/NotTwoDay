export type CreateUserPayload = {
  firstName: string;
  lastName: string;
  middleName?: string;
  laboratory: string;
  phoneNumber: string;
  passwordHash: string;
};
