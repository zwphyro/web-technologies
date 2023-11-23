import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/services/user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-left-menu',
    templateUrl: './left-menu.component.html',
    styleUrls: ['./left-menu.component.less']
})
export class LeftMenuComponent implements OnInit
{
    user: any

    constructor(private userService: UserService, private router: Router)
    {
    }

    ngOnInit()
    {
        this.userService.current_user.subscribe((user) =>
        {
            this.user = user
        })
    }

    openUsers()
    {
        this.router.navigate(["/users"])
    }

    openAdminModule()
    {
        location.assign("https://testdomain.localhost:3000")
    }
}
