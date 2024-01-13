import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit() {

  }

  onGoHome(): void {
    this.router.navigateByUrl('');
  }

}


