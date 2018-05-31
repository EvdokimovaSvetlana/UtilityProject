import { Injectable } from '@angular/core';
import { Month } from './month';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Detail } from './detail';
import { DetailAnotherType } from './detail-another-type';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()

export class MonthService {

  constructor(
    private http: HttpClient
  ) { }
  private monthUrl = 'api/months';

  private yearUrl = 'api/year';

  private detailAnotherUrl = 'api/mockInfoForPanel2';

  private detailUrl = 'api/mockInfoForPanel1';

  getMonths(): Observable<Month[]> {
    return this.http.get<Month[]>(this.monthUrl).pipe(tap(),
      catchError(this.handleError('getMonths', []))
    );
  }
  getYear(): Observable<number[]> {
    return this.http.get<number[]>(this.yearUrl).pipe(tap(),
      catchError(this.handleError('getYear', []))
    );
  }

  getPanel1(): Observable<Detail[]> {
    return this.http.get<Detail[]>(this.detailUrl).pipe(tap(),
      catchError(this.handleError('getPanel1', []))
    );
  }

  getPanel2(): Observable<DetailAnotherType[]> {
    return this.http.get<DetailAnotherType[]>(this.detailAnotherUrl).pipe(tap(),
      catchError(this.handleError('getPanel2', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

}
