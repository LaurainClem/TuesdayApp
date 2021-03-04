import { Component } from '@angular/core';
import { UserModel } from './models/user.model';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  me: UserModel = { id: 1, firstName: 'Clem', lastName: 'Laurain' };

  constructor(public readonly sharedService: SharedService) {}
}
