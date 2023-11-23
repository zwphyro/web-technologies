import {writeFile} from 'fs';
import users_list from "./data/users.json" assert {type: "json"};
import friends_list from "./data/friends.json" assert {type: "json"};
import news_list from "./data/news.json" assert {type: "json"};
import messages_list from "./data/messages.json" assert {type: "json"};

let last_user_id = getMaxId(users_list);
let last_news_id = getMaxId(news_list);

export {users_list};
export {friends_list};
export {news_list};
export {messages_list};

function getMaxId(list)
{
    let max_id = 0;
    for (let item of list)
    {
        max_id = Math.max(max_id, item.id);
    }
    return max_id++;
}

export class User
{
    constructor(id, first_name, last_name, date_of_birth, email, profile_picture_url, role, status, password)
    {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.date_of_birth = date_of_birth;
        this.email = email;
        this.profile_picture_url = profile_picture_url;
        this.role = role;
        this.status = status;
        this.password = password;
    }
}

export class Friend
{
    constructor(subscriber_id, respondent_id)
    {
        this.subscriber_id = subscriber_id;
        this.respondent_id = respondent_id;
    }
}

export class News
{
    constructor(id, user_id, content)
    {
        this.id = id;
        this.user_id = user_id;
        this.content = content;
    }
}

export function getUser(id)
{
    for (let item of users_list)
    {
        if (item.id === id)
        {
            return item;
        }
    }
}

export function getUserByEmail(email)
{
    for (let item of users_list)
    {
        if (item.email === email)
        {
            return item;
        }
    }
}

export function getFriends(id)
{
    let user_friends = [];
    for (let item of friends_list)
    {
        if (item.subscriber_id === id)
        {
            user_friends.push(getUser(item.respondent_id));
        }
    }
    return user_friends;
}

export function getNews(id)
{
    let user_news = [];
    for (let item of news_list)
    {
        if (item.user_id === id)
        {
            user_news.push(item);
        }
    }
    return user_news;
}

export function getFriendsNews(id)
{
    let user_friends = getFriends(id);
    let user_friends_news = [];
    for (let item of user_friends)
    {
        user_friends_news = user_friends_news.concat(getNews(item.id));
    }
    return user_friends_news;
}

export function saveUsers()
{
    writeFile('./data/users.json', JSON.stringify(users_list), (err) =>
    {
        if (err) throw err;
    });
}

export function saveNews()
{
    writeFile('./data/news.json', JSON.stringify(news_list), (err) =>
    {
        if (err) throw err;
    });
}

export function saveFriends()
{
    writeFile('./data/friends.json', JSON.stringify(friends_list), (err) =>
    {
        if (err) throw err;
    });
}

export function saveMessages()
{
    writeFile('./data/messages.json', JSON.stringify(messages_list), (err) =>
    {
        if (err) throw err;
    });
}

export function addUser(user)
{
    user.id = ++last_user_id;
    users_list.push(user);
    saveUsers();
}

export function removeUser(id)
{
    for (let i = 0; i < users_list.length; i++)
    {
        if (users_list[i].id === id)
        {
            users_list.splice(i, 1);
            break;
        }
    }
    saveUsers();
}

export function addNews(news)
{
    news.id = ++last_news_id;
    news_list.unshift(news);
    saveNews();
}

export function removeNews(id)
{
    for (let i = 0; i < news_list.length; i++)
    {
        if (news_list[i].id === id)
        {
            news_list.splice(i, 1);
            break;
        }
    }
    saveNews();
}

export function addFriend(friends)
{
    friends_list.push(friends);
    saveFriends();
}

export function removeFriend(friends)
{
    for (let i = 0; i < friends_list.length; i++)
    {
        if (friends_list[i].subscriber_id == friends.subscriber_id && friends_list[i].respondent_id == friends.respondent_id)
        {
            friends_list.splice(i, 1);
            break;
        }
    }
    saveFriends();
}

export function previewNews(news_list)
{
    let preview_news = [];
    for (let item of news_list)
    {
        let poster = getUser(item.user_id);
        preview_news.push({content: item.content, ...poster});
    }
    return preview_news;
}

export function addMessage(message)
{
    messages_list.unshift(message);
    saveMessages();
}

export function getCorrespondence(sender_id, receiver_id)
{
    let correspondence = [];
    for (let item of messages_list)
    {
        if ((item.sender_id == sender_id && item.receiver_id == receiver_id) ||
            (item.sender_id == receiver_id && item.receiver_id == sender_id))
        {
            correspondence.push(item);
        }
    }
    return correspondence;
}
