import { Component, Input } from '@angular/core';
import { WeatherDatas } from '../../../../models/interfaces/WeatherData';

import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons/faTemperatureLow';
import { faTemperatureHigh } from '@fortawesome/free-solid-svg-icons/faTemperatureHigh';
import { faDroplet} from '@fortawesome/free-solid-svg-icons/faDroplet';
import { faWind } from '@fortawesome/free-solid-svg-icons/faWind';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss'
})
export class WeatherCardComponent {

  @Input() weatherDatasInput!: WeatherDatas;

  minTemperatureIcon = faTemperatureLow;
  maxTemperatureIcon = faTemperatureHigh;
  humidityIcon = faDroplet;
  windIcon = faWind;
}
