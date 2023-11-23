import {Component, OnInit} from '@angular/core';
import {ApiService} from "../shared/services/api.service";
import {UserService} from "../shared/services/user.service";

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.less']
})
export class UsersListComponent implements OnInit
{
    user: any
    users: Array<any> = []
    friends: Array<any> = []
    only_friends: boolean = false

    constructor(private apiService: ApiService, private userService: UserService)
    {
        this.userService.current_user.subscribe((user) =>
        {
            this.user = user
        })
        this.apiService.getFriends(localStorage["myka.user_id"]).subscribe((data: any) =>
        {
            this.friends = data
        })
        this.apiService.getAllUsers().subscribe((data: any) =>
        {
            this.users = data
        })
    }

    ngOnInit()
    {

    }
}
