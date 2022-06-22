import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let users = [];
let tweets = [];

app.post("/sign-up", (req, res) => {
  if (!req.body.username || !req.body.avatar) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  users.push({
    username: req.body.username,
    avatar: req.body.avatar,
  });
  res.status(201).send("OK");
});

app.get("/sign-up", (req, res) => {
  res.send(users);
});

app.post("/tweets", (req, res) => {
  

  const { user: username } = req.headers;
  if (!username || !req.body.tweet) {
    res.status(400).send("Todos os campos são obrigatórios!");
  }
  let user = users.find((element) => element.username === username);
  let userTweet = {
    username: username,
    avatar: user.avatar,
    tweet: req.body.tweet,
  };
  tweets.push(userTweet);
  res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
  //let tweeters = [];
  const { page } = req.query;
  
  if(page && page < 1){
    res.status(400).send("Informe uma página válida");
    return;
  }

  const limit = 10;
  const start = (page - 1) * limit;
  const end = page * limit;

  for (let i = 0; i < 11; i++) {
    if (tweets[tweets.length - i]) {
      //tweeters.push(tweets[tweets.length - i]);
      [...tweets].push(tweets[tweets.length - i]);
    }
  }

  res.status(201).send([...tweets].reverse().slice(start, end));
});

app.get("/tweets/:username", (req, res) => {
  let tweetsUser = tweets.filter(
    (element) => element.username === req.params.username
  );
  res.send([...tweetsUser].reverse());
});

app.listen(5000);
