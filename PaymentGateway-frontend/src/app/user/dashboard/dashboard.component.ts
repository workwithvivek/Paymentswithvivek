import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  
  constructor(private router: Router) {}

  subscribe(planType: string): void {
    // Navigate to the summary page with the selected plan as a query parameter
    this.router.navigate(['user/summary'], { queryParams: { plan: planType } });
  }
}
