import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/services/user.service";
import {Router} from "@angular/router";
import {ApiService} from "../shared/services/api.service";
import {SocketIoService} from "../shared/services/socket-io.service";

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.less']
})
export class FeedComponent implements OnInit
{
    user: any
    feed_list: Array<any> = []
    profile_picture_url: string

    constructor(private apiService: ApiService, private socketService: SocketIoService, private userService: UserService, private router: Router)
    {
        this.socketService.listenToServer("create_post").subscribe((post) =>
        {
            setTimeout(() =>
            {
                this.apiService.getRelations({
                    subscriber_id: this.user.id,
                    respondent_id: post.id
                }).subscribe((data: any) =>
                {
                    if (data.is_subscriber)
                    {
                        let audio = new Audio("./assets/sound/bone-crack.mp3")
                        audio.play()
                        this.feed_list.unshift(post)
                    }
                })
            }, 500)
        })
        this.profile_picture_url = ""
    }

    ngOnInit()
    {
        if (localStorage["myka.user_id"] === undefined)
        {
            this.router.navigate(["/hello"])
        }
        this.userService.current_user.subscribe((user) =>
        {
            this.user = user
        })
        this.apiService.getUserFeed(localStorage["myka.user_id"]).subscribe((data: any) =>
        {
            this.feed_list = data
        })
    }

    protected readonly JSON = JSON;
}
