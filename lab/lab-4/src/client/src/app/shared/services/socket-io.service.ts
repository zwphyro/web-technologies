import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import * as socketIo from "socket.io-client"


@Injectable({
    providedIn: 'root'
})
export class SocketIoService
{
    private clientSocket: socketIo.Socket

    constructor()
    {
        this.clientSocket = socketIo.connect("https://localhost:3000")
    }

    listenToServer(connection: string): Observable<any>
    {
        return new Observable((subscribe) =>
        {
            this.clientSocket.on(connection, (data) =>
            {
                subscribe.next(data)
            })
        })
    }

    emitPost(post: any): void
    {
        this.clientSocket.emit("create_post", post)
    }

    emitMessage(message: any): void
    {
        this.clientSocket.emit("send_message", message)
    }
}
