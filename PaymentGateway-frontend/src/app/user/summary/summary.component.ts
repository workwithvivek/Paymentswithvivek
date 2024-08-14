import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  selectedMethod: string = '';
  paymentOptionsVisible: boolean = false;
  plan = {
    name: '',
    price: '',
    users: '',
    storage: '',
    support: ''
  };
  public payPalConfig?: IPayPalConfig;
  showSuccess: boolean = false;
  showCancel: boolean = false;
  showError: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const selectedPlan = params['plan'];
      this.setPlanDetails(selectedPlan);
    });

    this.initConfig(); // Initialize PayPal config when component is initialized
  }

  showPaymentOptions(): void {
    this.paymentOptionsVisible = true;
  }

  goBack(): void {
    this.paymentOptionsVisible = false;
  }

  confirmSubscription(): void {
    this.showPaymentOptions();
    console.log('Subscription confirmed for:', this.plan);
  }

  setPlanDetails(planType: string): void {
    switch (planType) {
      case 'basic':
        this.plan = {
          name: 'Basic Plan',
          price: '$10/month',
          users: '1 User',
          storage: '10 GB Storage',
          support: 'Basic Support'
        };
        break;
      case 'standard':
        this.plan = {
          name: 'Standard Plan',
          price: '$30/month',
          users: '5 Users',
          storage: '50 GB Storage',
          support: 'Priority Support'
        };
        break;
      case 'premium':
        this.plan = {
          name: 'Premium Plan',
          price: '$60/month',
          users: 'Unlimited Users',
          storage: '200 GB Storage',
          support: '24/7 Support'
        };
        break;
      default:
        this.plan = {
          name: 'Unknown Plan',
          price: 'N/A',
          users: 'N/A',
          storage: 'N/A',
          support: 'N/A'
        };
        break;
    }
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD', // Changed to USD
      clientId: 'AfA6zF4OppdK8GwL4GBU4l8K_KrCH3ZMzQBX5oozJ6eCJ1D_SRq-j1nx-xmYOfdkDsoSTj01AyOClIOb', // Your client ID here
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',  // Ensure currency code matches
            value: this.getPlanPrice(), // Dynamically set the price based on the plan
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.getPlanPrice()
              }
            }
          },
          items: [{
            name: this.plan.name,
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'USD',
              value: this.getPlanPrice(),
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - transaction completed successfully', data);
        this.showSuccess = true;
        this.router.navigate(['user/success'], { queryParams: { transactionId: data.id, status: 'success' } });
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.showCancel = true;
        this.router.navigate(['user/success'], { queryParams: { status: 'cancelled' } });
      },
      onError: err => {
        console.log('OnError', err);
        this.showError = true;
        this.router.navigate(['user/success'], { queryParams: { status: 'failure' } });
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        this.resetStatus();
      }
    };
  }

  private getPlanPrice(): string {
    return this.plan.price.replace('$', '').replace('/month', ''); 
  }

  private resetStatus(): void {
    this.showSuccess = false;
    this.showCancel = false;
    this.showError = false;
  }
}
