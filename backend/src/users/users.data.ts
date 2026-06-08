import { UserRole } from './user.entity';

export const MOCK_USERS = [
  {
    firstName: 'Антон',
    lastName: 'Губин',
    middleName: 'Михайлович',
    laboratory: '611',
    phoneNumber: '+79936103767',
    role: UserRole.ENGINEER,
    isApproved: false,
    createdAt: '2026-06-02T12:54:28.708Z',
  },
  {
    firstName: 'Анастасия',
    lastName: 'Начаркина',
    middleName: 'Витальевна',
    laboratory: '611',
    phoneNumber: '+79991235864',
    role: UserRole.CUSTOMER,
    isApproved: false,
    createdAt: '2026-06-01T12:54:28.708Z',
  },
  {
    firstName: 'Антон',
    lastName: 'Коваленко',
    middleName: 'Иванович',
    laboratory: '610',
    phoneNumber: '+79936104353',
    role: UserRole.CUSTOMER,
    isApproved: false,
    createdAt: '2026-06-02T12:54:28.708Z',
  },
];
