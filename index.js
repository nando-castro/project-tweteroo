import express from "express";
import cors from 'cors';

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
  tweets.push({
    username: req.body.username,
    avatar: req.body.avatar,
    tweet: req.body.tweet,
  });
  res.send("OK");
});

app.get("/tweets", (req, res) => {
  res.send(tweets);
});

app.listen(5000);
