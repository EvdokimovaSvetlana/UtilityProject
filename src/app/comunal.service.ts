import { Injectable } from '@angular/core';
import { Comunal } from './comunal';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Detail } from './detail';
import { DetailAnotherType } from './detail-another-type';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class ComunalService {

  constructor(private http: HttpClient) { }

  private comunalsUrl = 'api/comunal';

  private detailAnotherUrl = 'api/panel2';

  private detailUrl = 'api/panel1';

  getComunal(idmonth: number, idyear: number): Observable<Comunal[]> {
    const url = `${this.comunalsUrl}/?idyear=${idyear}&idmonth=${idmonth}`;
    return this.http.get<Comunal[]>(url).pipe(tap(),
      catchError(this.handleError<Comunal[]>(`getComunal`))
    );
  }

  getComunals(): Observable<Comunal[]> {
    return this.http.get<Comunal[]>(this.comunalsUrl).pipe(tap(),
      catchError(this.handleError('getComunals', []))
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

  updateComunal(comunal: Comunal): Observable<Comunal> {
    return this.http.put<Comunal>(this.comunalsUrl, comunal, httpOptions).pipe(
      catchError(this.handleError<any>('updateComunal'))
    );
  }

  updatePanel1(detail: Detail): Observable<Detail> {
    return this.http.put<Detail>(this.detailUrl, detail, httpOptions).pipe(
      catchError(this.handleError<any>('updatePanel1'))
    );
  }

  updatePanel2(detail: DetailAnotherType): Observable<DetailAnotherType> {
    return this.http.put<DetailAnotherType>(this.detailAnotherUrl, detail, httpOptions).pipe(
      catchError(this.handleError<any>('updatePanel2'))
    );
  }

  addComunal(comunal: Comunal): Observable<Comunal> {
    return this.http.post<Comunal>(this.comunalsUrl, comunal, httpOptions).pipe(
      catchError(this.handleError<Comunal>('addComunal'))
    );
  }

  addPanel1(detail: Detail): Observable<Detail> {
    return this.http.post<Detail>(this.detailUrl, detail, httpOptions).pipe(
      catchError(this.handleError<Detail>('addPanel1'))
    );
  }

  addPanel2(detail: DetailAnotherType): Observable<DetailAnotherType> {
    return this.http.post<DetailAnotherType>(this.detailAnotherUrl, detail, httpOptions).pipe(
      catchError(this.handleError<DetailAnotherType>('addPanel2'))
    );
  }

  deletePanel1(detail: Detail): Observable<Detail> {
    const id = detail.id;
    const url = `${this.detailUrl}/${id}`;

    return this.http.delete<Detail>(url, httpOptions).pipe(
      catchError(this.handleError<Detail>('deletePanel1'))
    );
  }

  deletePanel2(detail: DetailAnotherType): Observable<DetailAnotherType> {
    const id = detail.id;
    const url = `${this.detailAnotherUrl}/${id}`;

    return this.http.delete<DetailAnotherType>(url, httpOptions).pipe(
      catchError(this.handleError<DetailAnotherType>('deletePanel2'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
