import { Component, OnInit, Input } from '@angular/core';
import { ScaleType, Color } from '@swimlane/ngx-charts';
import { Observable, of } from 'rxjs';
import { LineChartData } from 'src/app/core/models/LineChartData';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  lineChartData$: Observable<LineChartData[]> = of([]);

  constructor (private olympicService: OlympicService) {}

  ngOnInit(): void {
  }
}
