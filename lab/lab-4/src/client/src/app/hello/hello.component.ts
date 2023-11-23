import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../shared/services/api.service";
import {UserService} from "../shared/services/user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-hello',
    templateUrl: './hello.component.html',
    styleUrls: ['./hello.component.less']
})
export class HelloComponent implements OnInit
{
    form: FormGroup
    error_message_enabled = false

    constructor(private apiService: ApiService, private userService: UserService, private router: Router)
    {
        this.form = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required])
        })
    }

    ngOnInit()
    {
        if (localStorage["myka.user_id"] !== undefined)
        {
            this.router.navigate(["/"])
        }
    }

    onSubmit()
    {
        this.apiService.logIn(this.form.value).subscribe((data: any) =>
        {
            localStorage["myka.user_id"] = data.id
            this.userService.changeUser(data)
            this.router.navigate(["/feed"])
        }, (error) =>
        {
            if (error.error.code == 1)
            {
                this.userService.changeUser(this.form.value)
                this.router.navigate(["/register"])
            } else if (error.error.code == 2)
            {
                let email_input_element: any = document.getElementById("EmailInput")
                let password_input_element: any = document.getElementById("PasswordInput")

                password_input_element.value = ""
                email_input_element.focus()

                this.error_message_enabled = true
            }
        })
    }

    onInput()
    {
        this.error_message_enabled = false
    }

}
