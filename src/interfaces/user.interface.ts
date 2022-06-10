export interface UserWithId {
  id: number,
  username: string,
  classe: string,
  level: number,
  password: string
}

export type User = Omit<UserWithId, 'id'>;

export type LoginUser = Omit<User, 'classe' | 'level'>;