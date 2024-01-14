import { Component, OnInit } from '@angular/core';
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

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympicService.getPieChartData().subscribe((data: PieChartData[]) => {
      this.pieChartData$ = of(data);
    });
  }

  onGoDetails(): void {
    this.router.navigateByUrl('CountryDetails');
  }

  customColors = [
    {
      name: 'Italy',
      value: '#956065'
    },
    {
      name: 'Spain',
      value: '#b8cbe7'
    },
    {
      name: 'United States',
      value: '#89a1db'
    },
    {
      name: 'Germany',
      value: '#793d52'
    },
    {
      name: 'France',
      value: '#9780a1'
    },
  ];
}
