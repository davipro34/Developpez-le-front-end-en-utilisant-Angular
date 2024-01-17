import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, mergeMap, of, take } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { PieChartData } from 'src/app/core/models/PieChartData';
import { Participation } from 'src/app/core/models/Participation';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]);
  pieChartData$: Observable<PieChartData[]> = of([]);
  numberOfJos!: number;
  numberOfCountries!: number;
  windowWidth = window.innerWidth;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.getPieChartData().pipe(take(1)).subscribe((data: PieChartData[]) => {
      this.pieChartData$ = of(data);
    });
    this.getTotalJos().pipe(take(1)).subscribe(data => {
      this.numberOfJos = data;
    });
    this.getTotalCountries().pipe(take(1)).subscribe(data => {
      this.numberOfCountries = data;
    });
  }
  
  /**
   * Returns the total number of Olympic participations.
   * @returns An Observable that emits the total number of Olympic participations.
   */
  getTotalJos(): Observable<number> {
    return this.olympicService.getOlympics().pipe(
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
    return this.olympicService.getOlympics().pipe(
      map(olympics => olympics.map(olympic => olympic.country)),
      map(countries => [...new Set(countries)]),
      map(uniqueCountries => uniqueCountries.length)
    );
  }

  /**
  * Retrieves the pie chart data for the Olympics.
  * @returns An Observable of an array of objects representing the pie chart data.
  */
  getPieChartData(): Observable<PieChartData[]> {
    return this.olympicService.getOlympics().pipe(
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


  onChartClick(data: any): void {
    console.log(data);
    const countryName = data.name;
    this.router.navigate(['/country-details', countryName]);
    console.log(countryName);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.windowWidth = window.innerWidth;
  }

  public colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#956065', '#b8cbe7', '#89a1db', '#793d52', '#9780a1'] // Remplacez ces valeurs par les couleurs que vous souhaitez utiliser
  }

}
