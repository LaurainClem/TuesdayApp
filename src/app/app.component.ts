import { Component } from '@angular/core';
import { UserModel } from './models/user.model';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  me: UserModel = { Id: 1, FirstName: 'Clem', LastName: 'Laurain' };

  constructor(public readonly sharedService: SharedService) {}
}
