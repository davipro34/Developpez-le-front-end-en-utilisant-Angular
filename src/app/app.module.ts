import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { HeaderComponent } from './components/header/header.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { DetailsComponent } from './pages/details/details.component';
import { CountryDetailsComponent } from './pages/country-details/country-details.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, HeaderComponent, PieChartComponent, LineChartComponent, DetailsComponent, CountryDetailsComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule, NgxChartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
