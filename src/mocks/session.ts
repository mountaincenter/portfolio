import { Session } from "next-auth";

export const mockSession: Session = {
  user: {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://via.placeholder.com/150",
  },
  expires: "2023-12-31T23:59:59.999Z",
};

export const mockSessionWithoutImage: Session = {
  user: {
    id: "2",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    image: null,
  },
  expires: "2023-12-31T23:59:59.999Z",
};
