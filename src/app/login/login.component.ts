import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { WheatherService } from '../wheather.sevice';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  weatherData: any;
  error: string = '';
  loding=true;
  weatherIconUrl:string='';
  currentTime:string='';
  isDay:boolean=true

  constructor(private weatherService: WheatherService,private router:Router) {}

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.weatherService.getCurrentWeather(latitude, longitude).subscribe({
            next: (data) => {
              this.weatherData = data;
              setTimeout(()=>{
                this.loding = false;
              },1000)
              const iconCode = data.weather[0].icon;
              this.weatherIconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
              const currentTimestamp = Math.floor(Date.now() / 1000);
              this.currentTime = new Date(currentTimestamp * 1000).toLocaleTimeString(); 

              const sunrise = data.sys.sunrise;
              const sunset = data.sys.sunset;

             
              this.isDay = currentTimestamp >= sunrise && currentTimestamp <= sunset;
            },
            error: () => (this.error = 'Unable to fetch weather data.')
          });
        },
        () => (this.error = 'Location access denied.')
      );
    } else {
      this.error = 'Geolocation is not supported by your browser.';
    }
  }
}


  // navigate(){
  //    this.router.navigate(['/search'])
  // }








