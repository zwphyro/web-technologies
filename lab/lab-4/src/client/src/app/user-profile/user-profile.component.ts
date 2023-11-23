import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../shared/services/api.service";
import {SocketIoService} from "../shared/services/socket-io.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Dialog, DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {UserService} from "../shared/services/user.service";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.less'],
})
export class UserProfileComponent implements OnInit
{
    user: any
    news: Array<any> = []
    date_string: string = ''
    is_owner: boolean = false
    is_subscriber: boolean = false
    is_respondent: boolean = false

    constructor(private apiService: ApiService, private socketService: SocketIoService, private router: Router, private route: ActivatedRoute, public dialog: Dialog)
    {
        this.socketService.listenToServer("create_post").subscribe((post) =>
        {
            this.news.unshift(post)
        })
    }

    ngOnInit()
    {
        if (localStorage["myka.user_id"] === undefined)
        {
            this.router.navigate(["/hello"])
        }

        if (localStorage["myka.user_id"] !== undefined)
        {
            this.apiService.getCurrentUser(this.route.snapshot.params["id"]).subscribe((data: any) =>
            {
                this.user = data
                let parse_date = new Date(this.user.date_of_birth)
                let month = parse_date.getMonth() + 1
                let date = parse_date.getDate()
                let year = parse_date.getFullYear()
                this.date_string = `${month}/${date}/${year}`
            })
        }

        this.is_owner = localStorage["myka.user_id"] == this.route.snapshot.params["id"]

        this.apiService.getRelations({
            subscriber_id: localStorage["myka.user_id"],
            respondent_id: this.route.snapshot.params["id"]
        }).subscribe((data: any) =>
        {
            this.is_subscriber = data.is_subscriber
            this.is_respondent = data.is_respondent
        })

        this.apiService.getUserNews(this.route.snapshot.params["id"]).subscribe((data: any) =>
        {
            this.news = data
        })
    }

    resizeInput(event: any)
    {
        let audio = new Audio("./assets/sound/voice_sans.mp3")
        audio.play()
        let input_element: any = document.getElementById("InputField")
        input_element.style.height = `${event.target.scrollHeight - 20}px`
    }

    editProfile()
    {
        this.dialog.open<string>(DialogComponent, {
            data: this.user
        })
    }

    writeMessage()
    {
        this.router.navigate(["/messenger", `${this.route.snapshot.params["id"]}`])
    }

    addFriend()
    {
        this.is_subscriber = true
        this.apiService.addFriend({
            subscriber_id: localStorage["myka.user_id"],
            respondent_id: this.route.snapshot.params["id"]
        }).subscribe()
    }

    removeFriend()
    {
        this.is_subscriber = false
        this.apiService.removeFriend({
            subscriber_id: localStorage["myka.user_id"],
            respondent_id: this.route.snapshot.params["id"]
        }).subscribe()
    }

    logOut()
    {
        localStorage.removeItem("myka.user_id")
        this.router.navigate(["/"])
    }

    createPost()
    {
        let audio = new Audio("./assets/sound/sans_joVbTAU.mp3")
        audio.play()
        let input_element: any = document.getElementById("InputField")
        this.socketService.emitPost({content: input_element.value, ...this.user})
        input_element.value = ""
    }


    changePhoto()
    {
        let choose_file_element: any = document.getElementById("choose_file")
        choose_file_element.click()
    }

    sendFile()
    {
        let choose_file_element: any = document.getElementById("choose_file")
        this.apiService.changeAvatar(localStorage["myka.user_id"], choose_file_element.files[0]).subscribe((data) =>
        {
            setTimeout(() =>
            {
                location.reload()
            }, 500)
        })
    }

}

@Component({
    selector: 'app-edit-dialog',
    templateUrl: './dialog.html',
    styleUrls: ['./dialog.less'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule]
})
export class DialogComponent implements OnInit
{
    form: FormGroup

    constructor(private apiService: ApiService, private userService: UserService, public dialogRef: DialogRef<string>, @Inject(DIALOG_DATA) public data: any)
    {
        this.form = new FormGroup({})
    }

    ngOnInit()
    {
        let parse_date = new Date(this.data.date_of_birth)
        let month = '0'.repeat(2 - (parse_date.getMonth() + 1).toString().length) + (parse_date.getMonth() + 1)
        let date = '0'.repeat(2 - (parse_date.getDate()).toString().length) + parse_date.getDate()
        let year = '0'.repeat(4 - (parse_date.getFullYear()).toString().length) + parse_date.getFullYear()
        this.form = new FormGroup({
            email: new FormControl(this.data.email, [Validators.required, Validators.email]),
            password: new FormControl(this.data.password, [Validators.required]),
            first_name: new FormControl(this.data.first_name, [Validators.required, Validators.pattern('^[A-Z][a-z]+$')]),
            last_name: new FormControl(this.data.last_name, [Validators.required, Validators.pattern('^[A-Z][a-z]+$')]),
            date_of_birth: new FormControl(`${year}-${month}-${date}`, [Validators.required]),
        })
    }

    onSubmit()
    {
        this.data.email = this.form.value.email
        this.data.password = this.form.value.password
        this.data.first_name = this.form.value.first_name
        this.data.last_name = this.form.value.last_name
        this.data.date_of_birth = this.form.value.date_of_birth

        this.userService.changeUser(this.data)
        this.apiService.changeUser(this.data).subscribe()

        this.dialogRef.close()
    }

}
