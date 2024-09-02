import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserModel } from './user.model';
import { UsersService } from './users.service';
import { UserRole } from './roles.enum';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RolePipe } from './role.pipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, RouterOutlet, NgFor, RolePipe, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'formTest';
  userService = inject(UsersService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  private readonly destroyRef = inject(DestroyRef);

  roles = [
    {
      value: UserRole.ADMIN,
      label: 'Admin'
    },
    {
      value: UserRole.USER,
      label: 'User'
    },
    {
      value: UserRole.GUEST,
      label: 'Guest'
    },
  ]

  filterForm: FormGroup;

  users: UserModel[] = [];

  constructor() {
    console.log('+this.activatedRoute.snapshot.queryParams', +this.activatedRoute.snapshot.queryParams['role'])
    this.filterForm = this.formBuilder.group({
      name: [this.activatedRoute.snapshot.queryParams['name']],
      role: [+this.activatedRoute.snapshot.queryParams['role'] || UserRole.ADMIN]
    })
  }

  ngOnInit() {
    this.activatedRoute.queryParams
    .pipe(debounceTime(100))
    .subscribe(map => {
      console.log('map', map)
      // this.filterForm.setValue({name: map['name'], role: map['role']})
      this.getUsers(map['name'] || '', +map['role'] || UserRole.ADMIN);
    })

    this.filterForm.valueChanges.
      pipe(debounceTime(3000))
      .subscribe((user: UserModel) => {
        this.getUsers(user.name, user.role)
        this.router.navigate(['/'], {
          queryParams: {
            name: user.name,
            role: user.role
          }
      })
    })
  }

  getUsers(name: string, role: UserRole) {
    this.userService.getUsers(name, +role)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((val) => {
        console.log(val)
        this.users = val;
      })
  }

}
