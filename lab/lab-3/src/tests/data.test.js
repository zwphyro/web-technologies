import * as data from '../data_interactions.js';

// getUser
test("Get user", () =>
{
    let user = data.getUser(0);
    expect(user).toBeDefined();
    expect(user.id).toBe(0);
});


// getUserByEmail
test("Get user by email", () =>
{
    let user = data.getUserByEmail('george@gmail.com');
    expect(user).toBeDefined();
    expect(user.email).toBe('george@gmail.com');
});

// getFriends
test("Get friends", () =>
{
    let friends = data.getFriends(0);
    expect(friends).toBeDefined();
    for (let item of friends)
    {
        expect(data.friends_list).toContainEqual({
            subscriber_id: 0,
            respondent_id: item.id
        });
    }
});

// getMews
test("Get news", () =>
{
    let news = data.getNews(0);
    expect(news).toBeDefined();
    for (let item of news)
    {
        expect(item.user_id).toBe(0);
    }
});

// getFriendsNews
test("Get friends news", () =>
{
    let news = data.getFriendsNews(0);
    expect(news).toBeDefined();
    for (let item of news)
    {
        expect(data.friends_list).toContainEqual({
            subscriber_id: 0,
            respondent_id: item.user_id
        });
    }
});

// getCorrespondence
test("Get friends news", () =>
{
    let correspondence = data.getCorrespondence(0, 1);
    expect(correspondence).toBeDefined();
    for (let item of correspondence)
    {
        if (item.sender_id === 0)
        {
            expect(item.receiver_id).toBe(1);
        } else
        {
            expect(item.sender_id).toBe(1);
            expect(item.receiver_id).toBe(0);
        }
    }
});
