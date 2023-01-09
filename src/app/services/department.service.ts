import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// environment
import { environment } from 'src/environments/environment';

// interface
import { Department } from '../interfaces/department';

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {

  private apiUrl:string = environment.apiUrl + '/department/list';

  constructor(private http:HttpClient) {

  }

  getList(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }

}
