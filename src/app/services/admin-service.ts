import { inject, Injectable } from '@angular/core';
import { Admin } from '../models/admin';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const BASE_URL="http://localhost:4001/admins"
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly http:HttpClient=inject(HttpClient)
  public getAdmins():Observable<Admin[]>{
    return this.http.get<Admin[]>(BASE_URL)
  }
}
