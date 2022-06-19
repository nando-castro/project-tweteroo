import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let users = [];
let tweets = [];

app.post("/sign-up", (req, res) => {
  if(req.body.username !== '' && req.body.avatar !== ''){
    users.push({
      username: req.body.username,
      avatar: req.body.avatar,
    });
    res.status(201).send("OK");
  }else{
    res.sendStatus(400).send("Todos os campos são obrigatórios!");
  }
  
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

app.get("/tweets/:username", (req, res) => {
  let tweetsUser = tweets.filter(element => element.username === req.params.username);
  console.log(tweetsUser);
  res.send(tweetsUser);
});

app.listen(5000);
