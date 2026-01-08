import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-addbutton',
  imports: [RouterModule],
  templateUrl: './addbutton.html',
  styleUrl: './addbutton.css',
  template: `
    <button class="btn btn-primary" (click)="onClick()">
      + {{ label }}
    </button>
  `,
})
export class Addbutton {

  
  @Input() label = 'Add';
  @Input() navigateTo?: string;

  constructor(private router: Router) {}

  onClick() {
    if (this.navigateTo) {
      this.router.navigate([this.navigateTo]);
    }
  }

}
