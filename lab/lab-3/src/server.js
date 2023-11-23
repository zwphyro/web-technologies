import cors from "cors"
import express from 'express'
import https from 'https'
import fs from 'fs'
import * as data from './data_interactions.js'
import url from "url";
import {api} from "./routes/api.js"
import fileUpload from 'express-fileupload'

import * as socket from "socket.io"

const server = express()

server.use(cors({
    'credentials': true,
    'origin': true,
    'methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
    'allowedHeaders': 'Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Cache-Control, Accept',
}))

server.use(express.static("public"))
server.use(express.static("dist"))
server.use(express.json({limit: '100mb'}))
server.use(express.urlencoded({extended: true, limit: '100mb', parameterLimit: 100000}))
server.use(fileUpload({}))

server.set("view engine", "ejs")

server.get('/', (request, response) =>
{
    response.render("index", {users_list: data.users_list})
})

server.get('/:id', (request, response) =>
{
    let id = Number(request.params.id)
    let url_parts = url.parse(request.url, true)

    let user = data.getUser(Number(request.params.id))

    let friends = url_parts.query.friends
    let users_list
    if (friends === undefined)
    {
        users_list = data.users_list
    } else
    {
        users_list = data.getFriends(id)
    }

    let feed = url_parts.query.feed
    let news_list
    if (feed === undefined)
    {
        news_list = data.getNews(id)
    } else
    {
        news_list = data.getFriendsNews(id)
    }

    news_list = data.previewNews(news_list)

    response.render("index", {selected_user: user, users_list: users_list, news_list: news_list})
})

server.put('/:id/data', (request, response) =>
{
    let user = data.getUser(Number(request.params.id))
    user.first_name = request.body.first_name
    user.last_name = request.body.last_name
    user.date_of_birth = request.body.date
    user.email = request.body.email
    data.saveUsers()
    response.end()
})

server.put('/:id/role', (request, response) =>
{
    let user = data.getUser(Number(request.params.id))
    user.role = request.body.role
    data.saveUsers()
    response.end()
})

server.put('/:id/status', (request, response) =>
{
    let user = data.getUser(Number(request.params.id))
    user.status = request.body.status
    data.saveUsers()
    response.end()
})

server.use("/api", api)

const options = {
    key: fs.readFileSync("/etc/ssl/private/testdomain.localhost.key"),
    cert: fs.readFileSync("/etc/ssl/certs/testdomain.localhost.crt")
}

let https_server = https.createServer(options, server)


let io = new socket.Server(https_server, {cors: {origin: "http://localhost:4200"}})

// io.use(cors({
//     'credentials': true,
//     'origin': true,
//     'methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
//     'allowedHeaders': 'Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Cache-Control, Accept',
// }))

io.on("connection", (socket) =>
{
    socket.on("create_post", (changes) =>
    {
        data.addNews({id: 0, user_id: changes.id, content: changes.content})
        io.sockets.emit("create_post", changes)
    })

    socket.on("send_message", (changes) =>
    {
        data.addMessage(changes)
        io.sockets.emit("send_message", changes)
    })
})

https_server.listen(3000)

