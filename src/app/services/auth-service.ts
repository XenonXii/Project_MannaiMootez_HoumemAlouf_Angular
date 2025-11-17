import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  login(mail: string, password: string,admins:Admin[]): Observable<boolean> {
    const found = admins.find(admin =>
        admin.mail === mail &&
        admin.password === password
      );
      if(found){
        sessionStorage.setItem('adminId', found.id.toString());
        sessionStorage.setItem("connected","true")
        return of(true)
      }
      else{
        return of (false)
      }

    
  }
  logout(): void {
    sessionStorage.removeItem('adminId');
    sessionStorage.setItem("connected","false")
  }
}
