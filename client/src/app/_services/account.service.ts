import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})

// The data that we store inside the services doesn't get destroyed until our application is closed down
//Components are destroyed when we move from one componenet to other componenet
//and that is why service is a singleto n
export class AccountService {
  baseUrl = environment.apiUrl; 
  //creating an observable to store our user in means to persists the user on page reload
  //whenwver this observable is subscribed then they'll get the values of the obaservable 
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }
  //this comes under a concept of observables
//thi is subscribed in nav component and therefore the following function gonna run and populate
//our user inside local storage in the browser
  login(model: any) {
    //pipe is used to taransform data that gets from https req before subscribing
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      //coming from user.ts, as response is set to User type
      //response gets two properties specified in User interface i.e., username, token
      map((response: User) => {
        const user = response;
        if(user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    )
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register',model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

setCurrentUser(user: User) {
  this.currentUserSource.next(user);
}

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }  
}
