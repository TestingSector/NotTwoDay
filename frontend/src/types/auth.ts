export type LoginFormData = {
  phoneNumber: string;
  password: string;
};

export type RegisterFormData = {
  lastName: string;
  firstName: string;
  middleName?: string;
  laboratory: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};
