import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey: string = environment.apiKey;
  private apiUrl: string = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeatherDatas(cityName: string): Observable<any> {
    const url = `${this.apiUrl}?q=${cityName}&units=metrics&mode=json&appid=${this.apiKey}`;
    return this.http.get(url);
  }
}
