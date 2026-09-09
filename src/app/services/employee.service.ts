import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly employeesUrl = `${environment.apiBaseUrl}/employees`;

  constructor(private _http: HttpClient) {
  }

  addEmployee(data: any): Observable<any> {
    return this._http.post(this.employeesUrl, data);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.put(`${this.employeesUrl}/${encodeURIComponent(String(id))}`, data);
  }

  getEmployeeList(): Observable<any> {
    return this._http.get(this.employeesUrl);
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`${this.employeesUrl}/${encodeURIComponent(String(id))}`);
  }
}
