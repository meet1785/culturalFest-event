export interface Activity {
  activity_id?: number;
  event_id: number;
  venue_id: number;
  activity_name: string;
  activity_description?: string;
  start_time?: Date | string;
  end_time?: Date | string;
  created_at?: Date;
  updated_at?: Date;
  
  // Frontend helpers (not in DB schema)
  eventName?: string; // For display purposes
  venueName?: string; // For display purposes
}