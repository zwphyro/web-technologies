import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {HelloComponent} from './hello/hello.component';
import {StartComponent} from './start/start.component';
import {FeedComponent} from './feed/feed.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from './register/register.component';
import {NgOptimizedImage} from "@angular/common";
import {UserCardComponent} from './user-card/user-card.component';
import {LeftMenuComponent} from './left-menu/left-menu.component';
import {NewsListComponent} from './news-list/news-list.component';
import {PostComponent} from './post/post.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {UserRedirectComponent} from './user-redirect/user-redirect.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CdkAccordionModule} from "@angular/cdk/accordion";
import {UsersListComponent} from './users-list/users-list.component';
import {MatTabsModule} from "@angular/material/tabs";
import {DialogModule} from "@angular/cdk/dialog";
import { MessengerComponent } from './messenger/messenger.component';

@NgModule({
    declarations: [
        AppComponent,
        HelloComponent,
        StartComponent,
        FeedComponent,
        RegisterComponent,
        UserCardComponent,
        LeftMenuComponent,
        NewsListComponent,
        PostComponent,
        UserProfileComponent,
        UserRedirectComponent,
        UsersListComponent,
        MessengerComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgOptimizedImage,
        BrowserAnimationsModule,
        CdkAccordionModule,
        MatTabsModule,
        DialogModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule
{
}
