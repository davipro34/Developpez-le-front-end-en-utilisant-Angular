import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-pie-chart-sample',
  templateUrl: './pie-chart-sample.component.html',
  styleUrls: ['./pie-chart-sample.component.scss']
})
export class PieChartSampleComponent implements OnInit {
  pieChartData$: Observable<any[]> = of([]);

  constructor (private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.getOlympics().pipe(
      map((olympics: Olympic[]) => olympics.map((olympic: Olympic) => ({
        name: olympic.country,
        value: olympic.participations.reduce((total: number, p: Participation) => total + p.medalsCount, 0)
      })))
    ).subscribe((data: any[]) => {
      this.pieChartData$ = of(data);
    });
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
