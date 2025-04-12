import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(error => {
      // Handle different types of errors here
      let errorMessage = 'An unknown error occurred!';
      
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else if (error.status) {
        // Server-side error
        switch (error.status) {
          case 401:
            errorMessage = 'Unauthorized. Please log in again.';
            // You could redirect to login page or clear auth data
            localStorage.removeItem('token');
            localStorage.removeItem('currentUser');
            break;
          case 403:
            errorMessage = 'Forbidden. You do not have permission to access this resource.';
            break;
          case 404:
            errorMessage = 'Resource not found.';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          default:
            errorMessage = `Error ${error.status}: ${error.message}`;
        }
      }
      
      console.error(errorMessage, error);
      return throwError(() => new Error(errorMessage));
    })
  );
};