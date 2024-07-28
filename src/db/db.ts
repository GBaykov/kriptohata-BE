import { IUser, DB, IBoard, ITask } from "../types";

const users: IUser[] = [
  {
    id: "string",
    name: "string",
    email: "string",
    password: "string",
    tel: "string",
    role: "string",
  },
];

const callback = [{ id: "string", name: "string", tel: "string" }];
const orders = [
  {
    id: "string",
    user_id: "string",
    date: "string",
    items: [],
  },
];

const videocards = [{}];

const boards: Array<IBoard> = [
  { id: "string", title: "string", columns: null },
];

const tasks: Array<ITask> = [
  {
    id: "string",
    title: "string",
    order: 1,
    description: "string",
    userId: "string",
    boardId: "string",
    columnId: "string",
  },
];

const db: DB = [users, boards, tasks];

export default db;
