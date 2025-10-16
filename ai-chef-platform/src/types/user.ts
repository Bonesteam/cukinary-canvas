export type UserRole = "customer" | "chef";

export interface AppUser {
  _id: string;
  name?: string;
  email: string;
  image?: string;
  role: UserRole;
  tokens: number;
  createdAt?: string;
  updatedAt?: string;
}
