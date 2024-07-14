export enum Status {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  REVIEW = "REVIEW",
  DONE = "DONE",
}

export interface User {
  id: number;
  name: string;
  email: string;
  image: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: Status;
  user: User;
}
