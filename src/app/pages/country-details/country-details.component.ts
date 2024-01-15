import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { LineChartData } from 'src/app/core/models/LineChartData';
import { tap } from 'rxjs/operators';

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
    
    /**
    * Retrieving the value passed to this route to fill the countryName variable.
    * If `params.get('countryName')` is not set it returns an empty string (`''`).
    * 
    */
    this.route.paramMap.subscribe(params => {
      this.countryName = params.get('countryName') ?? '';
      //console.log(this.countryName)  // Logging : To view the result in the console.
    });
        
    /**
    * Function to call, with countryName parameter, to view the result of getOlympicsByCountryName in the graphic.
    * countryName value obtained from event (click) of pie chart
    */
    this.olympicService.getOlympicsByCountryName(this.countryName).pipe(
      // tap(data => console.log(data)) // Logging : To view the result in the console.
    ).subscribe(data => {
      this.lineChartData = data;
    });
    
    /**
     * Fetches the number of Olympic participations for a specific country.
     * `this.olympicService.getParticipationByCountry(this.countryName)` calls a method to get the participation data.
     * `.pipe()` is an RxJS operator for chaining functions.
     * `.subscribe(data => { this.numberOfParticipation = data; })` subscribes to the Observable and updates `this.numberOfParticipation` with the returned data.
     */
    this.olympicService.getParticipationByCountry(this.countryName).pipe(
      // tap(data => console.log(data)) // Logging : To view the result in the console.
    ).subscribe(data => {
      this.numberOfParticipation = data;
    });

    /**
    * Fetches the total number of Olympic medals for a specific country.
    * `this.olympicService.getTotalMedalsByCountry(this.countryName)` calls a method to get the medal data.
    * `.pipe()` is an RxJS operator for chaining functions.
    * `.subscribe(data => { this.totalNumberOfMedals = data; })` subscribes to the Observable and updates `this.totalNumberOfMedals` with the returned data.
    */
    this.olympicService.getTotalMedalsByCountry(this.countryName).pipe(
      // tap(data => console.log(data)) // Logging : To view the result in the console.
    ).subscribe(data => {
      this.totalNumberOfMedals = data;
    });

    /**
    * Fetches the total number of Olympic athletes for a specific country.
    * `this.olympicService.getTotalAthletesByCountry(this.countryName)` calls a method to get the athlete data.
    * `.pipe()` is an RxJS operator for chaining functions.
    * `.subscribe(data => { this.totalNumberOfAthletes = data; })` subscribes to the Observable and updates `this.totalNumberOfAthletes` with the returned data.
    */
    this.olympicService.getTotalAthletesByCountry(this.countryName).pipe(
      // tap(data => console.log(data)) // Logging : To view the result in the console.
    ).subscribe(data => {
      this.totalNumberOfAthletes = data;
    });
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
