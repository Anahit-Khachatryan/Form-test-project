import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from './models/user.model';

@Pipe({
  name: 'name',
  standalone: true
})
export class NamePipe implements PipeTransform {

  transform(value: UserModel, ...args: unknown[]): unknown {
    return `${value.firstName} ${value.lastName}`;
  }

}
