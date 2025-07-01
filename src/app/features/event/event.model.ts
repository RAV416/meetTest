export interface EventModel {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly date: Date[];
  readonly location: string;
  readonly participants: string[];
  readonly image?: string;
}
