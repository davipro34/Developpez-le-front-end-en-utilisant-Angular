import { ErrorHandler, Injectable} from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  handleError(error: { message: any; }) {
     // Logique de gestion des erreurs ici
     const errorMessage = `Error caught by global error handler : ${error.message}`;
     console.error(errorMessage);
  }
  
}