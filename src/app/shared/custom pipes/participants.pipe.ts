import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from '../../features/user/user.model';

@Pipe({
  name: 'participantEmailToName',
  standalone: true,
})
export class ParticipantEmailToNamePipe implements PipeTransform {
  transform(participantIds: string[] | string, users: UserModel[]): string {
    if (!participantIds || !users?.length) return '';

    const ids = (
      Array.isArray(participantIds) ? participantIds : [participantIds]
    ).filter((email) => !!email);

    if (ids.length === 0) return '';

    const names = ids.map((email) => {
      const user = users.find((u) => u.email === email);
      return user ? `${user.name} ${user.surname}` : 'Unknown';
    });

    return names.join(', ');
  }
}
