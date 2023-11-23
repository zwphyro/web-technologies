import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.less']
})
export class PostComponent
{
    @Input() post_info: any = {}

    constructor(private router: Router)
    {
    }

    openProfile()
    {
        this.router.navigate(["/user", `${this.post_info.id}`])
    }
}
