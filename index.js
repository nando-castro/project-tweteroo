import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let users = [];
let tweets = [];

app.post("/sign-up", (req, res) => {
  users.push({
    username: req.body.username,
    avatar: req.body.avatar,
  });
  res.send("OK");
});

app.get("/sign-up", (req, res) => {
  res.send(users);
});

app.post("/tweets", (req, res) => {
  let user = users.find(element => element.username === req.body.username)
  let userTweet = {
    username: req.body.username,
    avatar: user.avatar,
    tweet: req.body.tweet,
  };
  tweets.push(userTweet);
  res.send("OK");
});

app.get("/tweets", (req, res) => {
  let tweeters = [];

  for(let i = 0; i < 11; i++){
    if(tweets[tweets.length - i ]){
      tweeters.push(tweets[tweets.length - i]);
    }
  }
  res.send(tweeters);
});

app.listen(5000);
