import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {

  constructor(private olympicService: OlympicService, private router: Router) {}
  
  ngOnInit() {
  
  }

  onGoHome(): void {
    this.router.navigateByUrl('');
  }
}
