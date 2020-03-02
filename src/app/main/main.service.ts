import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Product } from './product';
import { Person } from './person';
import { catchError, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class MainService {

  readonly url: 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{

    return this.http.get<Product[]>('http://localhost:3000/api/products')
    .pipe(
      tap(p=>console.log(p)),
      catchError((e) => {
        console.log(e);
        return throwError(e);
      })
    )
  }
  getPeoples(): Observable<Person[]>{
    return this.http.get<Person[]>('http://localhost:3000/api/people')
    .pipe(
      tap(p=>console.log(p)),
      catchError((e) => {
        console.log(e);
        return throwError(e);
      })
    );
  }
}
