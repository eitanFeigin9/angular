import { Component } from '@angular/core';
import { IpCountryPageComponent } from "./components/ip-country-page/ip-country-page.component";

@Component({
  selector: 'app-root',
  imports: [ IpCountryPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title="";
}
