import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  public GetTrigram(user: UserModel): string {
    let trigram = '';
    trigram += user.FirstName.toUpperCase().slice(1, 2);
    trigram += user.LastName.toUpperCase().slice(1, 3);
    return trigram;
  }
}
