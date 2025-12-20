import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CancelService{
    private API_URL='http://localhost:8085/booking';
    constructor(private http: HttpClient){}
    cancelPNR(pnr:string): Observable <any>{
        return this.http.delete(`${this.API_URL}/cancel/${pnr}`);
    }
}