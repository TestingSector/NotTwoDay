import type { User }
  from "../types/user";

export const users: User[] = [
  {
    id: "1",

    firstName: "Дмитрий",
    lastName: "Иванов",
    middleName: "Дмитриевич",

    laboratory: "611",

    role: "engineer",

    phoneNumber: "+79999999999",

    createdAt: Date.now(),

    isApproved: true,
  },

  {
    id: "2",

    firstName: "Анна",
    lastName: "Соколова",
    middleName: "Игоревна",

    laboratory: "610",

    role: "dispatcher",

    phoneNumber: "+79999999998",

    createdAt: Date.now(),

    isApproved: true,
  },

  {
    id: "3",

    firstName: "Олег",
    lastName: "Клименко",
    middleName: "Олегович",

    laboratory: "614",

    role: "customer",

    phoneNumber: "+79999999997",

    createdAt: Date.now(),

    isApproved: true,
  },
];