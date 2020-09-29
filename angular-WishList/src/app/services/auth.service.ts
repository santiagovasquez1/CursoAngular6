import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getUser(): any {
    return localStorage.getItem('userName');
  }

  login(user: string, password: string) {
    if (user === 'user' && password === 'password') {
      localStorage.setItem('userName', user);
      return true;
    }
    return false;
  }

  logOut(): any {
    localStorage.removeItem('userName');
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }



}
