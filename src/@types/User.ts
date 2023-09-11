export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: null | string;
  background: null | string;
  created_at: Date;
};

export type UserCreateProps = {
  name: string;
  email: string;
  password: string;
};
