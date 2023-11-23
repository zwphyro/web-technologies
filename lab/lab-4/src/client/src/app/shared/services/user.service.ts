import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class UserService
{
    private user = new BehaviorSubject<any>({})
    current_user = this.user.asObservable()

    constructor()
    {
    }

    changeUser(user: any)
    {
        this.user.next(user)
    }
}
