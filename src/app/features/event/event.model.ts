export interface EventModel {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly date: string[];
  readonly location: string;
  participants: string[];
  readonly image?: string;
  readonly votes?: { [userId: string]: string[] };
  readonly createdBy: string
}
