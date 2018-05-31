import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Detail } from './detail';
import { DetailAnotherType } from './detail-another-type';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()

export class UtilityService {

  constructor(
    private http: HttpClient
  ) { }
  private detailAnotherUrl = 'api/mockInfoForPanel2';

  private detailUrl = 'api/mockInfoForPanel1';

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
