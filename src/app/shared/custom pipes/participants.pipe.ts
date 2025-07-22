import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from '../../features/user/user.model';

@Pipe({
  name: 'userIdToCredentialPipe',
  standalone: true,
})
export class UserIdToCredentialPipe implements PipeTransform {
   transform(
    input: string | string[],
    users: UserModel[],
    returnField: 'email' | 'name' | 'surname' | 'fullName' = 'fullName',
  ): string {
    if (!input || !users?.length) return '';

    const values = (Array.isArray(input) ? input : [input]).filter(Boolean);

    const result = values.map((value) => {
      const user =
        users.find((u) => u.id === value) ||
        users.find((u) => u.email === value);

      if (!user) return 'Unknown';

      switch (returnField) {
        case 'fullName':
          return `${user.name} ${user.surname}`;
        case 'name':
        case 'surname':
        case 'email':
          return user[returnField] || 'Unknown';
        default:
          return 'Unknown';
      }
    });

    return result.join(', ');
  }
}