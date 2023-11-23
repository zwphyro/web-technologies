import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../shared/services/api.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit
{
    form: FormGroup
    user: any

    constructor(private apiService: ApiService, private userService: UserService, private router: Router)
    {
        this.form = new FormGroup({})
    }

    ngOnInit()
    {
        if (localStorage["myka.user_id"] !== undefined)
        {
            this.router.navigate(["/"])
        }

        this.userService.current_user.subscribe((user) =>
        {
            this.user = user
        })

        this.form = new FormGroup({
            email: new FormControl(this.user.email, [Validators.required, Validators.email]),
            password: new FormControl(this.user.password, [Validators.required]),
            first_name: new FormControl(null, [Validators.required, Validators.pattern('^[A-Z][a-z]+$')]),
            last_name: new FormControl(null, [Validators.required, Validators.pattern('^[A-Z][a-z]+$')]),
            date_of_birth: new FormControl(null, [Validators.required]),
        })
    }

    onSubmit()
    {
        this.apiService.register(this.form.value).subscribe((data: any) =>
        {
            localStorage["myka.user_id"] = data.id
            this.userService.changeUser(data)
            this.router.navigate(["/feed"])
        })
    }
}
