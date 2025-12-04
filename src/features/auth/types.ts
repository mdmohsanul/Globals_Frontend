export interface RegisterPayload {
  userName: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  data: {
    userName: string;
    email: string;
    userId: string;
  };
}



export type User = {
  _id: string;
  userName: string;
  email: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

export type AuthResponse<T = User> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: { user: T };
};


export type LoginPayload = {
  email: string;
  password: string;
};
