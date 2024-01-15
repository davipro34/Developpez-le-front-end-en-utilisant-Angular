import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { LineChartData } from 'src/app/core/models/LineChartData';
import { filter, map, mergeMap, switchMap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {
  lineChartData!: LineChartData[];
  countryName!: string; // Debug : Add " = 'value'" when 'value' is the desired country name for test redirection.
  numberOfParticipation!: number;
  totalNumberOfMedals!: number;
  totalNumberOfAthletes!: number;
  windowWidth = window.innerWidth;

  constructor(private olympicService: OlympicService, private router: Router, private route: ActivatedRoute) {}
  
  ngOnInit() {
    
    // Retrieving the value passed to this route to fill the countryName variable.
    // If `params.get('countryName')` is not set it returns an empty string (`''`).
    this.route.paramMap.pipe(take(1)).subscribe(params => {
      this.countryName = params.get('countryName') ?? '';
      //console.log(this.countryName)  // Logging : To view the result in the console.
    });
        
    //Function to call, with countryName parameter, to view the result of getOlympicsByCountryName in the graphic.
    //countryName value obtained from event (click) of pie chart
    this.getOlympicsByCountryName(this.countryName).pipe(
      take(1)
    ).subscribe(data => {
      this.lineChartData = data;
    });
    
    // Fetches the number of Olympic participations for a specific country.
    this.getParticipationByCountry(this.countryName).pipe(
      take(1)
    ).subscribe(data => {
      this.numberOfParticipation = data;
    });

    // Fetches the total number of Olympic medals for a specific country.
    this.getTotalMedalsByCountry(this.countryName).pipe(
      take(1)
    ).subscribe(data => {
      this.totalNumberOfMedals = data;
    });

    // Fetches the total number of Olympic athletes for a specific country.
    this.getTotalAthletesByCountry(this.countryName).pipe(
      take(1)
    ).subscribe(data => {
      this.totalNumberOfAthletes = data;
    });
  }

  /**
  * Retrieves the Olympics data for a specific country.
  * @param countryName - The name of the country.
  * @returns An Observable of an array of LineChartData objects representing the Olympics data.
  */
  getOlympicsByCountryName(countryName: string): Observable<LineChartData[]> {
  return this.olympicService.getOlympics().pipe(
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

  /**
  * Retrieves the number of participations by country.
  * @param countryName - The name of the country.
  * @returns An Observable that emits the number of participations.
  */
  getParticipationByCountry(countryName: string): Observable<number> {
    return this.olympicService.getOlympics().pipe(
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
    return this.olympicService.getOlympics().pipe(
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
    return this.olympicService.getOlympics().pipe(
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

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.windowWidth = window.innerWidth;
  }
  /**
  * Navigates to the home page.
  */
  onGoHome(): void {
    this.router.navigateByUrl('');
  }
}
