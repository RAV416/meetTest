export interface EventModel {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  date: string[];
  readonly location: string;
  readonly participants: string[];
  readonly image?: string;
}
