import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-pie-chart-sample',
  templateUrl: './pie-chart-sample.component.html',
  styleUrls: ['./pie-chart-sample.component.scss']
})
export class PieChartSampleComponent implements OnInit {
  public olympics$: Observable<any> = of(null);

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympicsForChart();
  }
}
