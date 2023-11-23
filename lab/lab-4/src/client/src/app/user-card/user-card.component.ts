import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.less']
})
export class UserCardComponent
{
    @Input() user: any = {}

    constructor(private router: Router)
    {
    }

    openProfile()
    {
        this.router.navigate(["/user", `${this.user.id}`])
    }

    protected readonly location = location;
    protected readonly localStorage = localStorage;

}
