import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { PieChartData } from 'src/app/core/models/PieChartData';

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
    this.olympicService.getPieChartData().subscribe((data: PieChartData[]) => {
      this.pieChartData$ = of(data);
    });
    this.olympicService.getTotalJos().subscribe(data => {
      this.numberOfJos = data;
    });
    this.olympicService.getTotalCountries().subscribe(data => {
      this.numberOfCountries = data;
    });
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
}
