import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router = inject(Router);
  private readonly http = inject(HttpClient);

  constructor() { }

  login(data: LoginModel) {
    setTimeout(() => {
      console.log('login', data)
      const users = JSON.parse(localStorage.getItem('users') || '[]') || [];
      const user = users.find((u: any) => u.email === data.email && u.password === data.password)
      if (user) {
        this.router.navigateByUrl('/home');
      }
    } ,2_000);
    this.http.get('', {}).subscribe({
      next: (value) => {},
    })

  }

  register(data: RegisterModel) {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]') || [];
      users.push(data)
      localStorage.setItem('users', JSON.stringify(users))
      this.router.navigateByUrl('/login');
    })
  } 
}

interface LoginModel {
  email: string;
  password: string;
}

interface RegisterModel extends LoginModel {
  firstName: string;
  lastName: string;
  
}

//session storage taby pakeluc e linum
//local ka misht
//cookium sessiona pahum, vor avtomat heto gnuma backend stugumnera anum