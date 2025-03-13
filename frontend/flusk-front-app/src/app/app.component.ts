import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from "./form/form.component";
import { FieldsetModule } from 'primeng/fieldset';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormComponent, FieldsetModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'flusk-front-app';
}
