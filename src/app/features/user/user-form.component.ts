import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { UserModel } from './user.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styles: [],
  imports: [FormsModule, RouterModule, TitleCasePipe],
  standalone: true,
})
export class FormComponent {
  private userService: UserService = inject(UserService);
  private authService: AuthService = inject(AuthService);
  route: ActivatedRoute = inject(ActivatedRoute);
  
  mode: 'log in' | 'edit' | 'create' = 'log in';
  get credentials(): (keyof UserModel)[] {
    if (this.mode === 'create' || this.mode === 'edit')
      return ['name', 'surname', 'email', 'password', 'image'];
    return ['email', 'password'];
  }

  model: UserModel = {
    id: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    image: '',
  };


  ngOnInit(): void {
    this.route.url.subscribe((urlSegments) => {
      const path = urlSegments.map((segment) => segment.path).join('/');
      if (path === 'form/create') {
        this.mode = 'create';
      } else if (path === 'log in') {
        this.mode = 'log in';
      }
    });
  }

  getInputType(field: keyof UserModel): string {
    switch (field) {
      case 'email':
        return 'email';
      case 'password':
        return 'password';
      case 'image':
        return 'url';
      default:
        return 'text';
    }
  }
  getInputPattern(credential: string): string {
    switch (credential) {
      case 'email':
        return '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$';
      case 'password':
        return '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}';
      case 'name':
      case 'surname':
        return '^[a-zA-Z ]+$';
      default:
        return '';
    }
  }
  isRequired(credential: string): boolean {
    return ['email', 'password', 'name', 'surname'].includes(credential);
  }

  async onSubmit() {
    const user: UserModel = this.model;

    try {
      if (this.mode === 'create') {
        const cred = await this.authService.register(user.email, user.password);
        if (!cred.user) {
          throw new Error('User registration failed: user is null');
        }
        const newUser: UserModel = { ...user, id: cred.user.uid };
        await this.userService.addOne(newUser);
        console.log('User created and registered:', newUser.email);
      } else if (this.mode === 'edit') {
        await this.userService.updateOne(user.id, user);
        console.log('User updated:', user.id);
      } else {
        await this.authService.login(user.email, user.password);
        console.log('User logged in:', user.email);
      }
    } catch (error) {
      console.error('Error during form submit:', error);
    }
  }
}
