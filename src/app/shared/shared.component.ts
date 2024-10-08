import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-shared',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './shared.component.html',
  styleUrl: './shared.component.css'
})
export class SharedComponent {

}
