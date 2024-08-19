export type User = {
  id: string;
  name: string;
  avatar?: string;
};

export type Status = "Done" | "Progress" | "Incomplete";

export type Task = {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  userId: string;
  status: Status;
  user: User;
};

export type StatusValues = {
  status: string;
  color: string;
};
