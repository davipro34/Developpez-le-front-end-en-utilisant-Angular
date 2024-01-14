import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { LineChartData } from 'src/app/core/models/LineChartData';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {
  lineChartData!: LineChartData[];
  countryName: string = 'France'; // Replace 'value' with the desired country name

  constructor(private olympicService: OlympicService, private router: Router) {}
  
  ngOnInit() {
    
    /**
   * Test function to view the result of getOlympicsByCountryName in the console.
   */
    const testCountryName = 'France'; // Replace 'value' with the name of the country you want to test
    this.olympicService.getOlympicsByCountryName(testCountryName).subscribe({
      next: (data: any) => console.log(data),
      error: error => console.error(error)
    });
    
        
    /**
   * Function to call, with countryName parameter, to view the result of getOlympicsByCountryName in the graphic.
   * TODO = Obtain countryName value from event (click) of pie chart
   */
    //const countryName = 'Italy'; // Replace 'value' with the name of the country you want to test
    this.olympicService.getOlympicsByCountryName(this.countryName).subscribe(data => {
      this.lineChartData = data;
    });

  }

  /**
   * Navigates to the home page.
   */
  onGoHome(): void {
    this.router.navigateByUrl('');
  }

  // colorScheme: Color = {
  //   name: 'custom',
  //   selectable: true,
  //   group: ScaleType.Ordinal,
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };

}
