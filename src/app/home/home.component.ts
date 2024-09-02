import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../models/user.model';
import { NamePipe } from '../name.pipe';


const initialUsers: UserModel[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Lenon',
    email: 'john@gmail.com'
  },
  {
    id: 33,
    firstName: 'Kate',
    lastName: 'Minion',
    email: 'minion@gmail.com'
  },
  {
    id: 5,
    firstName: 'La',
    lastName: 'Kasa',
    email: 'kasa@gmail.com'
  },
]



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, NamePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnDestroy {
  search='';
  users = initialUsers;

  ngOnDestroy(): void {
    localStorage.clear();  
  }

  onFilter() {
    console.log('this.search', this.search);
    const filter = this.search.toLowerCase();
    this.users = initialUsers.filter(user => {
      const firstName = user.firstName.toLowerCase();
      const lastName = user.lastName.toLowerCase();
      return firstName.includes(filter) || lastName.includes(filter);
    })
  }

}

