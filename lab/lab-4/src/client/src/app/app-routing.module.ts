import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HelloComponent} from "./hello/hello.component";
import {StartComponent} from "./start/start.component";
import {FeedComponent} from "./feed/feed.component";
import {RegisterComponent} from "./register/register.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {UserRedirectComponent} from "./user-redirect/user-redirect.component";
import {UsersListComponent} from "./users-list/users-list.component";
import {MessengerComponent} from "./messenger/messenger.component";

const routes: Routes = [
    {path: "hello", component: HelloComponent},
    {path: "", component: StartComponent},
    {path: "feed", component: FeedComponent},
    {path: "register", component: RegisterComponent},
    {path: "user/:id", component: UserRedirectComponent},
    {path: "users", component: UsersListComponent},
    {path: "messenger/:id", component: MessengerComponent},
    {path: ":id", component: UserProfileComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule
{
}
