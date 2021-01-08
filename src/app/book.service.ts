import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {IBook} from './ibook';

const API_URL = environment.API_URL;
const BOOKS = environment.BOOKS;

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<any> {
    return this.http.get(API_URL + BOOKS);
  }


  findById(id: number): Observable<any> {
    return this.http.get(API_URL + BOOKS + '/' + id);
  }

  save(book: IBook): Observable<any> {
    if (!!book.id) {
      return this.http.put(API_URL + BOOKS + '/' + book.id, book);
    }
    return this.http.post(API_URL + BOOKS, book);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(API_URL + BOOKS + '/' + id);
  }
}
