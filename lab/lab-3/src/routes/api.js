import express from 'express';
import * as data from '../data_interactions.js';
import {writeFile} from 'fs';

const api = express.Router();

api.get("/user/:id", (request, response) =>
{
    let user = data.getUser(Number(request.params.id));
    if (user === undefined)
    {
        response.status(400);
        response.json({message: "User is undefined", code: 1});
    } else
    {
        response.json(user);
    }
});

api.post("/login", (request, response) =>
{
    let user = data.getUserByEmail(request.body.email);
    if (user === undefined)
    {
        response.status(400);
        response.json({message: "User is undefined", code: 1});
    } else if (user.password !== request.body.password)
    {
        response.status(400);
        response.json({message: "Wrong password", code: 2});
    } else
    {
        response.json(user);
    }
});

api.post("/register", (request, response) =>
{
    let submitted_user = {...request.body};
    submitted_user.date_of_birth = new Date(submitted_user.date_of_birth);
    submitted_user.profile_picture_url = "./images/no_avatar.png";
    submitted_user.role = "user";
    submitted_user.status = "unverified";
    data.addUser(submitted_user);
    response.json(submitted_user);
});

api.get("/feed/:id", (request, response) =>
{
    let feed_list = data.previewNews(data.getFriendsNews(Number(request.params.id)));
    response.json(feed_list);
});

api.get("/news/:id", (request, response) =>
{
    let feed_list = data.previewNews(data.getNews(Number(request.params.id)));
    response.json(feed_list);
});

api.get("/friends/:id", (request, response) =>
{
    let friends = data.getFriends(Number(request.params.id));
    response.json(friends);
});

api.get("/users", (request, response) =>
{
    response.json(data.users_list);
});

api.post("/relations", (request, response) =>
{
    let subscriber_id = Number(request.body.subscriber_id);
    let respondent_id = Number(request.body.respondent_id);

    let subscriber_friends = data.getFriends(subscriber_id);
    let respondent_friends = data.getFriends(respondent_id);

    response.json({
        is_respondent: respondent_friends.find((user =>
        {
            return user.id === subscriber_id;
        })) !== undefined,
        is_subscriber: subscriber_friends.find((user =>
        {
            return user.id === respondent_id;
        })) !== undefined
    });
});

api.post("/add_friend", (request, response) =>
{
    let subscriber_id = Number(request.body.subscriber_id);
    let respondent_id = Number(request.body.respondent_id);
    data.addFriend({subscriber_id: subscriber_id, respondent_id: respondent_id});
    response.end();
});

api.post("/remove_friend", (request, response) =>
{
    let subscriber_id = Number(request.body.subscriber_id);
    let respondent_id = Number(request.body.respondent_id);
    data.removeFriend({subscriber_id: subscriber_id, respondent_id: respondent_id});
    response.end();
});

api.post("/change/:id", (request, response) =>
{
    let user_id = Number(request.params.id);
    let user = data.getUser(user_id);
    user.email = request.body.email;
    user.password = request.body.password;
    user.first_name = request.body.first_name;
    user.last_name = request.body.last_name;
    user.date_of_birth = request.body.date_of_birth;
    data.saveUsers();
    response.end();
});

api.post("/change_avatar/:id", (request, response) =>
{
    let file = request['files'].file;

    writeFile(`./public/images/${file.name}`, file.data, (err) =>
    {
    });

    let user = data.getUser(Number(request.params.id));
    user.profile_picture_url = `./images/${file.name}`;
    data.saveUsers();

    response.end();
});

api.post("/messages", (request, response) =>
{
    let sender_id = Number(request.body.sender_id);
    let receiver_id = Number(request.body.receiver_id);
    console.log(sender_id, receiver_id);
    response.json(data.getCorrespondence(sender_id, receiver_id));
});

export {api};
