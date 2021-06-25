import {Observable, of as observableOf} from 'rxjs';
import {Injectable} from '@angular/core';
import {UserData} from '../data/users';

@Injectable()
export class UserService extends UserData {

    private time: Date = new Date;

    private users = {
        nick: {name: 'Magaiver Santos', picture: 'assets/images/avatar.jpeg'},
    };

    getUsers(): Observable<any> {
        return observableOf(this.users);
    }
}
