export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  image: string;
  role: "admin" | "moderator" | "user";
}

export interface Users {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface Login {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}
