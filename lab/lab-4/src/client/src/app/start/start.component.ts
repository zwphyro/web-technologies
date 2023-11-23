import {Component, OnInit} from '@angular/core';
import {ApiService} from "../shared/services/api.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.less']
})
export class StartComponent implements OnInit
{
    constructor(private apiService: ApiService, private router: Router)
    {
    };

    ngOnInit()
    {
        if (localStorage["myka.user_id"] === undefined)
        {
            this.router.navigate(["/hello"])
        } else
        {
            this.router.navigate(["/feed"])
        }
    }
}
