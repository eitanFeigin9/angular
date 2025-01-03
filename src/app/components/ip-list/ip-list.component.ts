import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IpMappingService } from '../../services/ip-mapping.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ip-list',
  templateUrl: './ip-list.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./ip-list.component.css'],
})
export class IpListComponent implements OnInit {
  ipList: any[] = [];
  sortOrder: { [key: string]: 'asc' | 'desc' } = {}; //Sort order.

  constructor(private ipMappingService: IpMappingService) {}

  ngOnInit(): void {
    //Import the ip per area values.
    this.ipMappingService.getIpList().subscribe((data) => {
      this.ipList = data});
  }

  sortBy(column: string): void {
        //Sort order for the given column.
    const direction = this.sortOrder[column] === 'asc' ? 'ASC' : 'DESC';
    this.ipMappingService.getIpList(column, direction).subscribe((data) => {
        this.ipList = data;
    });
    this.sortOrder[column] = this.sortOrder[column] === 'asc' ? 'desc' : 'asc';
    }
}
