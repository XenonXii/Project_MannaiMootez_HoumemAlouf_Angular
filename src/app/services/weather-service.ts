import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const BASE_URL="http://api.weatherapi.com/v1/current.json"
const KEY="d0868ad7bd14469d8bc164617252011"
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly http: HttpClient = inject(HttpClient);
  public getCurrentWeather(city:string):Observable<any>{
    return this.http.get<any>(
      `${BASE_URL}?key=${KEY}&q=${city}`
    );
  }
}
