export interface EventModel {
  readonly id?: string;
  readonly title: string;
  readonly description: string;
  readonly date: string;
  readonly time: string;
  readonly location: string;
  readonly image?: string;
}
