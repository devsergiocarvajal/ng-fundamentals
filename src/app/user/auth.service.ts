import { Injectable, Inject } from '@angular/core';
import { IUser } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthService {
    currentUser: IUser;

    constructor(@Inject(HttpClient) private http: HttpClient) { }

    loginUser(userName: string, password: string) {

      const loginInfo = { username: userName, password: password };
      const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

      return this.http.post('/api/login', loginInfo, options)
          .pipe(tap(data => {
              this.currentUser = <IUser>data['user'];
          }))
           .pipe(catchError(err => {
               return of(false);
           }))

      // this.currentUser = {
      //     id: 1,
      //     userName: userName,
      //     firstName: 'John',
      //     lastName: 'Papa'
      // };
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    updateCurrentUser(firstName: string, lastName: string) {
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;
    }
}
