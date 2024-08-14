import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  transactionId: string | null = null;
  isSuccess: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Get the transaction ID and success status from the route parameters
    this.route.queryParams.subscribe(params => {
      this.transactionId = params['transactionId'];
      this.isSuccess = params['status'] === 'success';
    });
  }

  goBackToHome(): void {
    this.router.navigate(['/']); // Navigate back to the home or another component
  }
}
