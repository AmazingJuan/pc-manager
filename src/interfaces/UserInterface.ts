// Author: Juan Pablo Avendaño

export interface UserInterface {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  computerIds: number[] | null;
}
