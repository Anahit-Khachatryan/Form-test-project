import { UserRole } from "./roles.enum";

export interface UserModel {
    id: number;
    name: string;
    role: UserRole
}