import {User} from '../interfaces/user.interface';
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {LoginResponseInterface} from '../interfaces/login-response.interface';

@Injectable({providedIn: 'root'})
export class AuthService {

  public error$: Subject<string> = new Subject<string>();

  constructor(public http: HttpClient) {
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('auth-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('auth-token');
  }

  login(user: User): Observable<any> {
    return this.http.post(`${environment.serverUrl}/auth/signIn`, user)
      .pipe(
        tap(this.setToken)
      );
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: LoginResponseInterface | null) {
    if (response) {
      const expDateResponse = new Date(response.expireAt);
      const expDate = new Date(new Date().getTime() + +expDateResponse * 1000);
      localStorage.setItem('auth-token', response.accessToken);
      localStorage.setItem('auth-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Неверный email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Такого email нет');
        break;
    }

    return throwError(error);
  }
}
