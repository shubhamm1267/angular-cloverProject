import { Component, OnInit } from '@angular/core';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { WheatherService } from '../wheather.sevice';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  searchBox = new Subject<string>();
  weatherData: any = null;
  error: string = '';
  favorites: any[] = [];
  loding = true;
  wheatherIconUrl: string = '';
  currentTime: string = '';
  isDay: boolean = true;
  constructor(private weatherService: WheatherService) {
    this.searchBox
      .pipe(
        debounceTime(1000),
        switchMap((term) => this.weatherService.getWeatherByCity(term))
      )
      .subscribe({
        next: (data) => {
          this.weatherData = data;
          this.error = '';
          const iconCode = data.weather[0].icon;
          this.wheatherIconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
          const currentTimestamp = Math.floor(Date.now() / 1000);
          this.currentTime = new Date(
            currentTimestamp * 1000
          ).toLocaleTimeString();

          const sunrise = data.sys.sunrise;
          const sunset = data.sys.sunset;

          this.isDay =
            currentTimestamp >= sunrise && currentTimestamp <= sunset;
        },
        error: () => {
          this.weatherData = null;
          this.error = 'You have entered a wrong city name.';
        },
      });
  }

  onSearch(city: string) {
    this.error = '';
    this.weatherData = null;
    this.searchBox.next(city);
  }

  addToFavorites() {
    if (
      this.weatherData &&
      !this.favorites.find((fav) => fav.id === this.weatherData.id)
    ) {
      this.favorites.push(this.weatherData);
      Swal.fire('', 'City Added To Favourite...', 'success');
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    } else {
      Swal.fire('', 'City Already Exits In Favourite...', 'error');
    }
  }

  removeAllFromFav() {
    if (this.favorites.length >= 1) {
      localStorage.removeItem('favorites');
      this.favorites = [];
      Swal.fire('', 'City Removed From Favourite...', 'success');
    } else {
      Swal.fire('', 'Nothing In Favourite...', 'error');
    }
  }

  loadFavorites() {
    const savedFavorites = localStorage.getItem('favorites');
    this.favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loding = false;
    }, 1000);
    this.loadFavorites();
  }
}
