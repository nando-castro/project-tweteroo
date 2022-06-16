import express from "express";

const app = express();

let users = [];
let tweets = [];
let user = {
  username: "patolino",
  avatar:
    "https://static.wikia.nocookie.net/looney-tunes/images/c/c0/Patolino.png/revision/latest?cb=20151212212504&path-prefix=pt-br",
};
let tweeter = {
  username: user.username,
  tweet: "Qua qua qua qua",
};

app.post("/sign-up", (req, res) => {
  users.push({
    username: user.username,
    avatar: user.avatar,
  });
  res.send("OK");
});

app.listen(5000);
