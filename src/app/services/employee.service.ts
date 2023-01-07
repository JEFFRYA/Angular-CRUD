import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// environment
import { environment } from 'src/environments/environment';

// interface
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  private apiUrl:string = environment.apiUrl;

  constructor(private http:HttpClient) {

  }

  getList(): Observable<Employee[]> {
    return this.http.get<Employee[]>( `${this.apiUrl}/employee/list` );
  }

  add( employee:Employee ): Observable<Employee> {
    return this.http.post<Employee>( `${this.apiUrl}/employee/save`, employee );
  }

  update( IdEmployee:number, employee:Employee ): Observable<Employee> {
    return this.http.put<Employee>( `${this.apiUrl}/employee/update/${IdEmployee}`, employee );
  }

  delete( IdEmployee:number ): Observable<void> {
    return this.http.delete<void>( `${this.apiUrl}/employee/delete/${IdEmployee}` );
  }

}
