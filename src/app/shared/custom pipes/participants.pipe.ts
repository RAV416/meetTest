import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from '../../features/user/user.model';


@Pipe({
  name: 'participantIdToName',
  standalone: true
})
export class ParticipantIdToNamePipe implements PipeTransform {
transform(participantIds: string[] | string, users: UserModel[]): string {
  if (!participantIds || !users?.length) return '';

  const ids = (Array.isArray(participantIds) ? participantIds : [participantIds]).filter(id => !!id);

  if (ids.length === 0) return '';

  const names = ids.map(id => {
    const user = users.find(u => u.id === id);
    return user ? `${user.name} ${user.surname}` : 'Unknown';
  });

  return names.join(', ');
}
}