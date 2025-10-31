export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
}

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = LoginPayload & { username: string };
