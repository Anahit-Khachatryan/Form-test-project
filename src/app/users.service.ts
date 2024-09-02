import { Injectable } from "@angular/core";
import { UserModel } from "./user.model";
import { UserRole } from "./roles.enum";
import { delay, filter, map, Observable, of } from "rxjs";
//rxjs das
@Injectable({
    providedIn: 'root'
})
export class UsersService {
   private users: UserModel[] = [
    {
        id: 1,
        name: 'John',
        role: UserRole.ADMIN
    },
    {
        id: 2,
        name: 'Pit',
        role: UserRole.GUEST
    },
    {
        id: 3,
        name: 'Stepan',
        role: UserRole.USER
    },
    {
        id: 4,
        name: 'Bob',
        role: UserRole.USER
    },
    {
        id: 5,
        name: 'Jimmy',
        role: UserRole.ADMIN
    },
    {
        id: 6,
        name: 'Kate',
        role: UserRole.ADMIN
    },
   ]
  
  constructor() {}

  getUsers(name: string, role: UserRole): Observable<UserModel[]> {
     return of(this.users).pipe(
        map((usersArr: UserModel[]) => {
        return usersArr.filter((user: UserModel) =>{
            return user.name.includes(name) && user.role === role
        });
     }),
     delay(1000)
    );
  } 
}