import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PieChartData } from 'src/app/core/models/PieChartData';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  pieChartData$: Observable<PieChartData[]> = of([]);

  constructor (private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.getPieChartData().subscribe((data: PieChartData[]) => {
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
