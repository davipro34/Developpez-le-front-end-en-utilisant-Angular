import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap, map, filter } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { Participation } from '../models/Participation';
import { PieChartData } from 'src/app/core/models/PieChartData';
import { LineChartData } from 'src/app/core/models/LineChartData';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {}

  /**
   * Loads the initial data for the Olympics service.
   * @returns An Observable of type Olympic[].
   */
  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        throw new Error(`Error loading initial data: ${error.message}`),
        console.error(error),
        this.olympics$.next([]);
        caught;
      }),
    );
  }

  /**
   * Retrieves the list of Olympics.
   * @returns An Observable that emits an array of Olympic objects.
   */
  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable().pipe(
      filter(olympics$ => olympics$ && olympics$.length > 0)
    );
  }

  /**
   * Retrieves the pie chart data for the Olympics.
   * @returns An Observable of an array of objects representing the pie chart data.
   */
  getPieChartData(): Observable<PieChartData[]> {
    return this.getOlympics().pipe(
      map((olympics: Olympic[]) => olympics.map((olympic: Olympic) => ({
        name: olympic.country,
        value: olympic.participations.reduce((total: number, p: Participation) => total + p.medalsCount, 0)
      })))
    );
  }
  getLineChartData(): Observable<LineChartData[]> {
    return this.getOlympics().pipe(
      map(olympics => {
        return olympics.map(olympic => ({
          name: olympic.country,
          series: olympic.participations.map(participation => ({
            name: String(participation.year),
            value: participation.medalsCount
          }))
        }));
      })
    );
  }
  /**
   * Retrieves the Olympic country with the specified ID.
   * @param countryId The ID of the country to retrieve.
   * @returns An Observable that emits the Olympic country with the specified ID.
   */
  getOlympicsCountryById(countryId: number): Observable<Olympic[]> {
    return this.getOlympics().pipe(
      map((olympics: Olympic[]) => olympics.filter((olympic: Olympic) => olympic.id === countryId))
    );
  }
}
