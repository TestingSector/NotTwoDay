import type { Task } from "../types/task";

export const tasks: Task[] = [
  {
    id: "1",
    title: "Испытание на сжатие",
    gost: "ГОСТ Р 56812",
    createdAt: 1716825600000,
    status: "active",
    estimatedTime: "18ч",
    creatorId: "3",
    executorId: "1",  
  },

  {
    id: "2",
    title: "Испытание на растяжение",
    gost: "ГОСТ 11262",
    createdAt: 1716825600000,
    status: "active",
    estimatedTime: "2ч",
    creatorId: "3",
    executorId: "1",
  },

  {
    id: "3",
    title: "Испытание на изгиб",
    gost: "ГОСТ 56810",
    createdAt: 1716825600000,
    status: "active",
    isUrgent: true,
    estimatedTime: "1ч", 
    creatorId: "3",
    executorId: "1",
  },

  {
    id: "4",
    title: "Испытание на изгиб",
    gost: "ГОСТ 56805",
    createdAt: 1716825600000,
    status: "active",
    isUrgent: false,
    estimatedTime: "5ч",
    creatorId: "3",
executorId: "1",
  },

  {
    id: "5",
    title: "Испытание на межслойный сдвиг",
    gost: "ГОСТ 57745",
    createdAt: 1716825600000,
    status: "pending",
    isUrgent: false,
    estimatedTime: "5ч",
    creatorId: "3",
  },
];