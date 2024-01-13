import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-pie-chart-sample',
  templateUrl: './pie-chart-sample.component.html',
  styleUrls: ['./pie-chart-sample.component.scss']
})
export class PieChartSampleComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]);

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympicsForChart();
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
