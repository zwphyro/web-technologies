import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-user-redirect',
    templateUrl: './user-redirect.component.html',
    styleUrls: ['./user-redirect.component.less']
})
export class UserRedirectComponent implements OnInit
{
    constructor(private router: Router, private route: ActivatedRoute)
    {
    }

    ngOnInit()
    {
        this.router.navigate([`/${this.route.snapshot.params["id"]}`])
    }
}
