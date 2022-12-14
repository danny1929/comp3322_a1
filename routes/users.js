var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/load", (req, res) => {
  if (!req.cookies.user_id) {
    res.send("");
    return;
  }
  req.db
    .collection("userList")
    .find()
    .then((users) => {
      // find the login user
      const login_user = users.find((user) => user._id == req.cookies.user_id);

      // construct the nested data
      const friends = login_user.friends.map((friend_name) => {
        const friend = users.find((user) => user.username === friend_name);
        return { username: friend.username, _id: friend._id };
      });

      res.send({
        _id: login_user._id,
        username: login_user.username,
        friends: friends,
      });
    })
    .catch((error) => res.send(error));
});

router.post("/login", (req, res) => {
  req.db
    .collection("userList")
    .find()
    .then((users) => {
      // find the login user
      const login_user = users.find(
        (user) =>
          user.username === req.body.username &&
          user.password === req.body.password
      );

      if (login_user === undefined) {
        res.send("Login failure");
        return;
      }

      // set the cookie
      res.cookie("user_id", login_user._id, { maxAge: 30 * 1000 * 60 });

      // construct the nested data
      const friends = login_user.friends.map((friend_name) => {
        const friend = users.find((user) => user.username === friend_name);
        return { username: friend.username, _id: friend._id };
      });
      res.send({
        _id: login_user._id,
        username: login_user.username,
        friends: friends,
      });
    })
    .catch((error) => res.send(error));
});

router.get("/logout", (req, res) => {
  res.clearCookie("user_id");
  res.send("");
});

module.exports = router;
