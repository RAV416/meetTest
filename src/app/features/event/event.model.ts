export interface EventModel {
  readonly id: string;
  title: string;
  description: string;
  date: string[];
  location: string;
  participants: string[];
  image?: string;
  votes?: { [userId: string]: number[] };
  createdBy: string
}
