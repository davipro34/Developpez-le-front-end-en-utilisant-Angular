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
      // tap((olympicsPie: Olympic[]) => {
      //   console.log('Olympics Pie:', olympicsPie);
      // }),
      map((olympicsPie: Olympic[]) => olympicsPie.map((olympicObject: Olympic) => {
        // console.log('Olympic Object:', olympicObject);
        return {
          name: olympicObject.country,
          value: olympicObject.participations.reduce((total: number, p: Participation) => {
            // console.log('Participation:', p);
            return total + p.medalsCount;
          }, 0)
        };
      }))
    );
  }

  getOlympicsByCountryName(countryName: string): Observable<LineChartData[]> {
    return this.getOlympics().pipe(
      map(olympicsLine => 
        olympicsLine
          .filter(olympicObject => olympicObject.country === countryName)
          .map(olympicObject => ({
            name: olympicObject.country,
            series: olympicObject.participations.map(participationObject => ({name: String(participationObject.year), value: participationObject.medalsCount}))
          }))
      )
    );
  }

}
