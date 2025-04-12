export interface Event {
  event_id?: number;
  event_name: string;
  event_description?: string;
  event_date?: Date | string;
  created_at?: Date;
  updated_at?: Date;
}