import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const baseUrl='http://localhost:1010/v0.1'

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {


  constructor(private http: HttpClient) { }

  usersocunt() {
    return this.http.get(`https://dummyjson.com/users`);
  }
  postCall(details: any,anotherItem:any) {
    return this.http.post(`${baseUrl}` + `Backend-end-point`, details);
  }
  sortAPIcall(sorttedvariable:any){
    return this.http.post(`${baseUrl}` + `Backend-end-point`, sorttedvariable);
  }

  deleteCall(id: any) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  putCall(data: any) {
    return this.http.put(`${baseUrl}` + `Backend-end-point`, data);
  }

  getCall() {
    return this.http.get(`${baseUrl}` + `Backend-end-point`);
  }
}
