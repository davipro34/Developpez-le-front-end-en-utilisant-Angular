import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap, map, filter, mergeMap, switchMap } from 'rxjs/operators';
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
   * Returns the total number of Olympic participations.
   * @returns An Observable that emits the total number of Olympic participations.
   */
  getTotalJos(): Observable<number> {
    return this.getOlympics().pipe(
      mergeMap(olympics => olympics.map(olympic => olympic.participations)),
      map(participations => participations.map(participation => participation.year)),
      map(years => [...new Set(years)]),
      map(uniqueYears => uniqueYears.length)
    );
  }

  /**
   * Returns an Observable that emits the total number of unique countries in the Olympics.
   * 
   * @returns An Observable that emits the total number of unique countries.
   */
  getTotalCountries(): Observable<number> {
    return this.getOlympics().pipe(
      map(olympics => olympics.map(olympic => olympic.country)),
      map(countries => [...new Set(countries)]),
      map(uniqueCountries => uniqueCountries.length)
    );
  }

  /**
   * Retrieves the number of participations by country.
   * 
   * @param countryName - The name of the country.
   * @returns An Observable that emits the number of participations.
   */
  getParticipationByCountry(countryName: string): Observable<number> {
    return this.getOlympics().pipe(
      filter(olympics => olympics.some(olympic => olympic.country === countryName)),
      mergeMap(olympics => olympics.map(olympic => olympic.participations)),
      map(participations => participations.length)
    );
  }

  /**
   * Returns the total number of medals won by a country.
   * @param countryName - The name of the country.
   * @returns An Observable that emits the total number of medals as a number.
   */
  getTotalMedalsByCountry(countryName: string): Observable<number> {
    return this.getOlympics().pipe(
      map(olympics => olympics.find(olympic => olympic.country === countryName)),
      switchMap(olympic => {
        if (olympic) {
          return of(olympic.participations.reduce((acc, participation) => acc + participation.medalsCount, 0));
        } else {
          return of(0);
        }
      })
    );
  }

  /**
   * Returns the total number of athletes for a given country.
   * @param countryName - The name of the country.
   * @returns An Observable that emits the total number of athletes.
   */
  getTotalAthletesByCountry(countryName: string): Observable<number> {
    return this.getOlympics().pipe(
      map(olympics => olympics.find(olympic => olympic.country === countryName)),
      switchMap(olympic => {
        if (olympic) {
          return of(olympic.participations.reduce((acc, participation) => acc + participation.athleteCount, 0));
        } else {
          return of(0);
        }
      })
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

  /**
   * Retrieves the Olympics data for a specific country.
   * @param countryName - The name of the country.
   * @returns An Observable of an array of LineChartData objects representing the Olympics data.
   */
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
