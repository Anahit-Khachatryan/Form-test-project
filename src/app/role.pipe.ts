import { Pipe, PipeTransform } from '@angular/core';
import { UserRole } from './roles.enum';

@Pipe({
  name: 'role',
  standalone: true
})
export class RolePipe implements PipeTransform {
  private roles =  {
    [UserRole.ADMIN]: 'Admin',
    [UserRole.USER]: 'User',
    [UserRole.GUEST]: 'Guest',


  }
  transform(value: UserRole): string {
   
    return this.roles[value];
  }

}
