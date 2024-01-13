import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap, map, filter } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { Participation } from '../models/Participation';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return caught;
      }),
    );
  }

  // Get all datas
  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable().pipe(
      filter(olympics$ => olympics$ && olympics$.length > 0)
    );
  }

  // Get olympic by id for PieChartSample
  getOlympicsForChart(): Observable<any> {
    return this.getOlympics().pipe(
      tap(olympics => console.log(olympics)), // log the data
      map((olympics: Olympic[]) => olympics.map((olympic: Olympic) => ({
        name: olympic.country,
        value: olympic.participations.reduce((total: number, p: Participation) => total + p.medalsCount, 0)
      })))
    );
  }
}
