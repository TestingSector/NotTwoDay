import type { Task } from "../types/task";

export const tasks: Task[] = [
  {
    id: "1",

    title: "Испытание на сжатие",
    gost: "ГОСТ Р 56812",

    customer: "Клименко О.Н.",

    createdAt: 1716825600000,

    status: "pending",

    estimatedTime: "18ч",
  },

  {
    id: "2",

    title: "Испытание на растяжение",
    gost: "ГОСТ 11262",

    customer: "Иванов А.А.",

    createdAt: 1716825600000,

    status: "active",

    executor: "Иванов Д.Д.",

    estimatedTime: "2ч",
  },

  {
    id: "3",

    title: "Испытание на изгиб",
    gost: "ГОСТ 56810",

    customer: "Петров И.И.",

    createdAt: 1716825600000,

    status: "pending",

    isUrgent: true,

    estimatedTime: "1ч",
  },

  {
    id: "4",

    title: "Испытание на изгиб",
    gost: "ГОСТ 56805",

    customer: "Начаркина А.Е.",

    createdAt: 1716825600000,

    status: "pending",

    isUrgent: false,

    estimatedTime: "5ч",
  },

  {
    id: "5",

    title: "Испытание на межслойный сдвиг",
    gost: "ГОСТ 57745",

    customer: "Начаркина А.Е.",

    createdAt: 1716825600000,

    status: "pending",

    isUrgent: false,

    estimatedTime: "5ч",
  },
];