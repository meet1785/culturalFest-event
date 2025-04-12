export interface Activity {
  activity_id?: number;
  venue_id: number;
  event_id?: number;
  activity_name: string;
  activity_description?: string;
  start_time?: Date;
  end_time?: Date;
}