import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { UserModel } from './user.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { AuthService } from '../../service/auth.service';

interface Credential {
  name: string;
  surname: string;
  email: string;
  password: string;
  image?: string;
  id?: string;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styles: [],
  imports: [FormsModule, RouterModule, TitleCasePipe],
  standalone: true,
})
export class UserFormComponent {
  private userService: UserService = inject(UserService);
  private authService: AuthService = inject(AuthService);
  route: ActivatedRoute = inject(ActivatedRoute);

  mode: 'log in' | 'edit' | 'create' = 'log in';
  get credentials(): (keyof Credential)[] {
    if (this.mode === 'create' || this.mode === 'edit')
      return ['name', 'surname', 'email', 'password', 'image'];
    return ['email', 'password'];
  }

  model: Credential = {
    name: '',
    surname: '',
    email: '',
    password: '',
    image: '',
    id: '',
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
  getInputType(credential: string): string {
    switch (credential) {
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
        return '^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$';
      case 'password':
        return '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}';
      default:
        return '';
    }
  }
  isRequired(credential: string): boolean {
    return ['email', 'password', 'name', 'surname'].includes(credential);
  }

  async onSubmit() {
    const user: Credential = this.model;

    try {
      if (this.mode === 'create') {
        await this.authService.register(
          user.email,
          user.password!,
          user.name,
          user.surname
        );
        
        console.log('User created and registered:', user.email);
      } else if (this.mode === 'edit') {
        await this.userService.updateOne(user.id!, user);
        console.log('User updated:', user.id);
      } else {
        await this.authService.login(user.email, user.password!);
        console.log('User logged in:', user.email);
      }
    } catch (error) {
      console.error('Error during form submit:', error);
    }
  }
}
