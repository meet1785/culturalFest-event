export interface ActivityRegistration {
  registration_id?: number;
  user_id: number;
  activity_id: number;
  registration_date?: Date;
  additional_info?: string;
  
  // Frontend helpers (not in DB schema)
  user_name?: string;
  activity_name?: string;
}