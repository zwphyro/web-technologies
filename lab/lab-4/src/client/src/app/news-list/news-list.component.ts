import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../shared/services/api.service";

@Component({
    selector: 'app-news-list',
    templateUrl: './news-list.component.html',
    styleUrls: ['./news-list.component.less']
})
export class NewsListComponent
{
    @Input() feed_list: Array<any> = []
}
