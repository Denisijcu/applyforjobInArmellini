import { Injectable } from '@angular/core';

import { User } from '../models/user';

@Injectable()
export class UserService {
   createUser(user: User) {
           //Log user data in console
           console.log("User Name: " + user.email);
   }   
}