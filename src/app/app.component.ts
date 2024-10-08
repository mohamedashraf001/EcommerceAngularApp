import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { HomeImageComponent } from './shared/home-image/home-image.component';
import { HomeTextComponent } from './shared/home-text/home-text.component';
import { AllProductsComponent } from './Products/components/all-products/all-products.component';
import { FooterComponent } from './shared/footer/footer.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,HomeImageComponent,HomeTextComponent,AllProductsComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EcommerceApp';
}
