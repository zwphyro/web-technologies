import {Component, OnInit} from '@angular/core';
import {ApiService} from "../shared/services/api.service";
import {ActivatedRoute} from "@angular/router";
import {SocketIoService} from "../shared/services/socket-io.service";

@Component({
    selector: 'app-messenger',
    templateUrl: './messenger.component.html',
    styleUrls: ['./messenger.component.less']
})
export class MessengerComponent implements OnInit
{
    sender: any
    got_sender: boolean = false
    receiver: any
    got_receiver: boolean = false
    messages: Array<any> = []

    constructor(private apiService: ApiService, private socketService: SocketIoService, private route: ActivatedRoute)
    {
        this.socketService.listenToServer("send_message").subscribe((message) =>
        {
            if (message.sender_id == this.sender.id)
            {
                this.messages.unshift({content: message.content, ...this.sender})
            } else if (message.sender_id == this.receiver.id)
            {
                let audio = new Audio("./assets/sound/metal-pipe-falling.mp3")
                audio.play()
                this.messages.unshift({content: message.content, ...this.receiver})
            }
        })
    }

    ngOnInit()
    {
        this.apiService.getCurrentUser(localStorage["myka.user_id"]).subscribe((data: any) =>
        {
            this.sender = data
            this.got_sender = true
            this.check()
        })
        this.apiService.getCurrentUser(this.route.snapshot.params["id"]).subscribe((data: any) =>
        {
            this.receiver = data
            this.got_receiver = true
            this.check()
        })

    }

    check()
    {
        if (this.got_sender && this.got_receiver)
        {
            this.apiService.getMessages(localStorage["myka.user_id"], this.route.snapshot.params["id"]).subscribe((data: any) =>
            {
                // this.messages = data
                for (let item of data)
                {
                    if (item.sender_id == this.sender.id)
                    {
                        this.messages.push({content: item.content, ...this.sender})
                    } else if (item.sender_id == this.receiver.id)
                    {
                        this.messages.push({content: item.content, ...this.receiver})
                    }
                }
                console.log(this.messages)
            })
        }
    }

    resizeInput(event: any)
    {
        let input_element: any = document.getElementById("InputField")
        input_element.style.height = `${event.target.scrollHeight - 20}px`
    }

    sendMessage()
    {
        let input_element: any = document.getElementById("InputField")
        this.socketService.emitMessage({
            sender_id: this.sender.id,
            receiver_id: this.receiver.id,
            content: input_element.value
        })
        input_element.value = ""
    }
}
