export interface LineChartData {
  name: string;
  series: LineChartSeriesData[];
}

export interface LineChartSeriesData {
  name: string;
  value: number;
}