import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class CountryDetailsComponent {
  @Input() totalIpRanges: number = 0;
  @Input() ipRanges: { ipStart: string; ipEnd: string }[] = []; 
}
