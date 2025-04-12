export const API_BASE_URL = 'http://localhost:8080/api';

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh-token`
  },
  
  // Event endpoints
  EVENTS: {
    BASE: `${API_BASE_URL}/events`,
    GET_BY_ID: (id: number) => `${API_BASE_URL}/events/${id}`,
  },
  
  // Activity endpoints
  ACTIVITIES: {
    BY_EVENT: (eventId: number) => `${API_BASE_URL}/events/${eventId}/activities`,
    GET_BY_ID: (eventId: number, activityId: number) => 
      `${API_BASE_URL}/events/${eventId}/activities/${activityId}`,
    REGISTER: (eventId: number, activityId: number) => 
      `${API_BASE_URL}/events/${eventId}/activities/${activityId}/register`
  },
  
  // Venue endpoints
  VENUES: {
    BASE: `${API_BASE_URL}/venues`,
    GET_BY_ID: (id: number) => `${API_BASE_URL}/venues/${id}`,
    ACTIVITIES: (id: number) => `${API_BASE_URL}/venues/${id}/activities`
  },
  
  // User endpoints
  USERS: {
    PROFILE: `${API_BASE_URL}/users/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/users/profile`,
    REGISTRATIONS: `${API_BASE_URL}/users/registrations`,
    CANCEL_REGISTRATION: (id: number) => `${API_BASE_URL}/users/registrations/${id}`
  }
};