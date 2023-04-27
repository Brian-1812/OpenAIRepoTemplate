export interface QueryPayload {
  payload: string;
}

export interface IUser {
  id: number;
  email: string;
  name?: string;
  phoneNumber?: string;
  files?: string;
  createdAt: string;
  updatedAt?: string;
  // deletedAt?: string;
}

export interface IChat {
  id: number;
  question: string;
  response: string;
  userId: IUser["id"];
  user: IUser;
  createdAt: string;
  updatedAt?: string;
  // deletedAt?: string;
}

export interface ITokenStructured {
  email?: string;
  name?: string;
  id: IUser["id"];
}
