import { Component, OnInit } from '@angular/core';
import { IpMappingService } from '../../services/ip-mapping.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IpListComponent } from '../ip-list/ip-list.component';
import { CountryDetailsComponent } from "../country-details/country-details.component";

@Component({
  selector: 'app-ip-country-page',
  templateUrl: './ip-country-page.component.html',
  styleUrls: ['./ip-country-page.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CountryDetailsComponent,
    IpListComponent
  ],
  standalone: true,
})
export class IpCountryPageComponent implements OnInit {
  ipList: any[] = [];
  inputCountry: string = ''; 
  filteredCountries: string[] = [];
  searchResults: { ipStart: string; ipEnd: string }[] = [];
  searchFlagUrl: string = '';
  loading: boolean = false;
  validCountry: string = '';  

  constructor(private ipMappingService: IpMappingService) {}

  ngOnInit(): void {
    this.ipMappingService.getIpList().subscribe(//import the ip list from the service (DB
      (data) => {
        this.ipList = data;
      },
      (error) => {
        console.error('Error importing IP list:', error);
      }
    );
  }

  onSearchInput(): void {
    //This function will insert into filteredCountries the countries that includes in their names the current input value.
    if (!this.inputCountry.trim()) {
      this.filteredCountries = [];
      return;
    }

    this.ipMappingService.getCountries('ASC').subscribe((countries) => {
      this.filteredCountries = countries
        .map((country) => country.countryName)
        .filter((name) =>
          name.toLowerCase().includes(this.inputCountry.toLowerCase())
        );
    });
  }

  searchByCountry(): void {
    //Import ip data of a specific country.
    const country = this.inputCountry.trim();
    
    if (!country) {
      alert('Please enter a valid country name!');
      return;
    }

    this.loading = true;
    this.ipMappingService.getIpList().subscribe(
      (data) => {
        const filteredData = data.filter(
          (ip: any) => ip.countryName.toLowerCase() === country.toLowerCase()
        );

        if (filteredData.length > 0) {
          this.searchResults = filteredData;
          this.searchFlagUrl = `https://flagcdn.com/w320/${filteredData[0].countryCode.toLowerCase()}.png`;

          // Update the validCountry variable only after validation
          this.validCountry = country;
        } else {
          this.searchResults = [];
          this.searchFlagUrl = '';
          alert('No results found for the entered country!');
        }

        this.loading = false;
      },
      (error) => {
        console.error('Error importing data:', error);
        this.loading = false;
        alert('An error occurred while importing data.');
      }
    );
  }

  displayCountry(countryName: string): string {
    return countryName ? countryName : '';
  }
}
