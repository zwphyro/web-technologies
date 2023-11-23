import {Component, OnInit} from '@angular/core';
import {ApiService} from './shared/services/api.service';
import {Router} from "@angular/router";
import {UserService} from "./shared/services/user.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit
{
    constructor(private apiService: ApiService, private userService: UserService, private router: Router)
    {
    }

    ngOnInit()
    {
        if (localStorage["myka.user_id"] !== undefined)
        {
            this.apiService.getCurrentUser(localStorage["myka.user_id"]).subscribe((data: any) =>
            {
                this.userService.changeUser(data)
            }, (error) =>
            {
                localStorage.removeItem("myka.user_id")
                this.router.navigate(["/hello"])
            })
        }
    }

    returnHome()
    {
        this.router.navigate(["/"])
    }
}
