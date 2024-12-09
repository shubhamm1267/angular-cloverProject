import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WheatherService {
  private apiKey = "076cf15249c6ddfb126255b45d10e5e9";
  private baseUrl = "https://api.openweathermap.org/data/2.5/";
  constructor(private http: HttpClient) {}

  getCurrentWeather(lat: number, lon: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`
    );
  }

  getWeatherByCity(city: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}weather?q=${city}&appid=${this.apiKey}`
    );
  }
}
