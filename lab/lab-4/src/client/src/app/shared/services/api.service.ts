import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService
{
    options = {
        headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    }

    constructor(private http: HttpClient)
    {
    }

    logIn(user: { email: string, password: string })
    {
        let body = new URLSearchParams(user)
        return this.http.post("https://localhost:3000/api/login", body, this.options)
    }

    register(user: any)
    {
        let body = new URLSearchParams(user)
        return this.http.post("https://localhost:3000/api/register", body, this.options)
    }

    getCurrentUser(user_id: string | number)
    {
        return this.http.get(`https://localhost:3000/api/user/${user_id}`)
    }

    getUserFeed(user_id: string | number)
    {
        return this.http.get(`https://localhost:3000/api/feed/${user_id}`)
    }

    getUserNews(user_id: string | number)
    {
        return this.http.get(`https://localhost:3000/api/news/${user_id}`)
    }

    getRelations(relations: any)
    {
        let body = new URLSearchParams(relations)
        return this.http.post("https://localhost:3000/api/relations", body, this.options)
    }

    addFriend(relations: any)
    {
        let body = new URLSearchParams(relations)
        return this.http.post("https://localhost:3000/api/add_friend", body, this.options)
    }

    removeFriend(relations: any)
    {
        let body = new URLSearchParams(relations)
        return this.http.post("https://localhost:3000/api/remove_friend", body, this.options)
    }

    getAllUsers()
    {
        return this.http.get(`https://localhost:3000/api/users`)
    }

    getFriends(user_id: string | number)
    {
        return this.http.get(`https://localhost:3000/api/friends/${user_id}`)
    }

    changeUser(user: any)
    {
        let body = new URLSearchParams(user)
        return this.http.post(`https://localhost:3000/api/change/${user.id}`, body, this.options)
    }

    changeAvatar(id: string | number, file: File)
    {
        let formData = new FormData()
        formData.append("file", file)
        // let body = new URLSearchParams(formData)
        return this.http.post(`https://localhost:3000/api/change_avatar/${id}`, formData)
    }

    getMessages(sender_id: any, receiver_id: any)
    {
        let body = new URLSearchParams({sender_id: sender_id, receiver_id: receiver_id})
        return this.http.post(`https://localhost:3000/api/messages`, body, this.options)
    }

    // sendMessage(sender_id: any, receiver_id: any, content: any)
    // {
    //     let body = new URLSearchParams({sender_id: sender_id, receiver_id: receiver_id, content: content})
    //     return this.http.post(`https://localhost:3000/api/send_messages`, body, this.options)
    // }
}
