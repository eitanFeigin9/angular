import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IpMappingService {
  //Utility for combined the backend and the front end.
  private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  getCountries(sortOrder: 'ASC' | 'DESC'): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/countries?sort=${sortOrder}`);
  }
  getIpList(sortBy: string = 'ipStart', order: 'ASC' | 'DESC' = 'ASC'): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ips?sortBy=${sortBy}&order=${order}`);
  }
}
  
