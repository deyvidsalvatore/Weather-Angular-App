import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherDatas } from '../../../../models/interfaces/WeatherData';
import { Subject, takeUntil } from 'rxjs';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: ['./weather-home.component.scss']
})
export class WeatherHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  initialCityName: string = 'Recife';
  weatherDatas!: WeatherDatas;
  searchIcon = faMagnifyingGlass;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherDatas(this.initialCityName);
  }

  getWeatherDatas(cityName: string): void {
    this.weatherService.getWeatherDatas(cityName)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.weatherDatas = response;
            this.weatherDatas.main.temp = this.convertKelvinToCelsius(this.weatherDatas.main.temp);
            this.weatherDatas.main.feels_like = this.convertKelvinToCelsius(this.weatherDatas.main.feels_like);
            this.weatherDatas.main.temp_min = this.convertKelvinToCelsius(this.weatherDatas.main.temp_min);
            this.weatherDatas.main.temp_max = this.convertKelvinToCelsius(this.weatherDatas.main.temp_max);
            console.log(this.weatherDatas);
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  convertKelvinToCelsius(temperature: number): number {
    return temperature - 273.15;
  }

  onSubmit(): void {
    this.getWeatherDatas(this.initialCityName);
    this.initialCityName = '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
