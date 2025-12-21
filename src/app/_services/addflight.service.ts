import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddFlightService {
  private API_URL = 'http://localhost:8085/flights';
  constructor(private http: HttpClient) {}
  addFlight(payload: any): Observable<any> {return this.http.post(this.API_URL,payload,{withCredentials: true,headers: { 'Content-Type': 'application/json' }});
  }
}
