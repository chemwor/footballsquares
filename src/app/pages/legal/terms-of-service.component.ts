import { Component } from '@angular/core';
import { NavigationBarComponent } from 'src/app/components/navigation-bars/navigation-bar-1/navigation-bar.component';
import { FooterComponent as SaasV2FooterComponent } from 'src/app/pages/landings/saas-v2/components/footer/footer.component';

@Component({
  selector: 'app-terms-of-service',
  standalone: true,
  imports: [NavigationBarComponent, SaasV2FooterComponent],
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.scss']
})
export class TermsOfServiceComponent {}
