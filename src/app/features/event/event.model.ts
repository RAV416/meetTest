export interface EventModel {
  readonly id?: string; // Optional ID for the event, can be used for Firestore document ID
  readonly title: string; // Title of the event
  readonly description: string; // Description of the event
  readonly date: string; // Date of the event in ISO format (YYYY-MM-DD)
  readonly time: string; // Time of the event in HH:mm format
  readonly location: string; // Location of the event
  readonly image?: string; // Optional image URL for the event
}
