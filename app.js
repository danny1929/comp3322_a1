var express = require("express");
var app = express();
var monk = require("monk");
var db = monk("127.0.0.1:27017/assignment1");
var cookieParser = require("cookie-parser");
var session = require("express-session");

app.use(cookieParser());

app.use(function (req, res, next) {
  req.db = db;
  next();
});

// use middleware
app.use(
  session({
    secret: "random_string_goes_here",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/" + "albums.html");
});

// step 1 HTTP GET requests for http://localhost:8081/load.
app.get("/load", (req, res) => {
  if (req.cookies.user_id) {
    var col = db.get("userList");
    col.find().then((docs) => {
      var result = {
        username: docs[0].username,
        username_fd: [],
        _id_fd: [],
      };
      for (i = 0; i < docs.length; i++) {
        if (docs[i]._id == req.cookies.user_id) {
          result["username"] = docs[i].username;
          result["username_fd"] = docs[i].friends;
          for (j = 0; j < docs[i].friends.length; j++) {
            for (x = 0; x < docs.length; x++) {
              if (docs[x].username == docs[i].friends[j]) {
                result["_id_fd"][j] = docs[x]._id;
              }
            }
          }
        }
      }
      res.json(result);
    });
  } else res.send("");
});

// step 2 HTTP POST requests for http://localhost:8081/login
app.post("/login", express.urlencoded({ extended: true }), (req, res) => {
  var name = req.body.username;
  var pwd = req.body.password;
  var col = db.get("userList");
  col
    .find()
    .then((docs) => {
      var result = {
        username_fd: [],
        _id_fd: [],
      };
      for (i = 0; i < docs.length; i++) {
        if (docs[i].username == name && docs[i].password == pwd) {
          res.cookie("user_id", docs[i]._id, { maxAge: 30 * 60 * 1000 });
          result["username_fd"] = docs[i].friends;
          for (j = 0; j < docs[i].friends.length; j++) {
            for (x = 0; x < docs.length; x++) {
              if (docs[x].username == docs[i].friends[j]) {
                result["_id_fd"][j] = docs[x]._id;
              }
            }
          }
        }
      }
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
});
//});

// step 3 HTTP GET requests for http://localhost:8081/logout
app.get("/logout", (req, res) => {
  res.clearCookie("user_id");
  res.send("");
});

// step 4 HTTP GET requests for http://localhost:8081/getalbum?userid=xx&pagenum=xx
app.get("/getalbum", (req, res) => {
  /*res.send(req.session.loginName);*/
  var userid = req.query.userid;
  var pagenum = req.query.pagenum;
  if (userid == 0) {
    var col = db.get("mediaList");
    col
      .find({ userid: req.cookies.user_id }, { sort: { _id: -1 } })
      .then((docs) => {
        num_of_shown = 3;
        num_of_item = docs.length;
        num_of_page = Math.ceil(num_of_item / num_of_shown);
        var result = {
          media: [],
          num_of_page: num_of_page,
        };
        var count = 0;
        for (i = 0; i < docs.length; i++) {
          if (i - num_of_shown * pagenum >= 0) {
            if (count < num_of_shown) {
              result["media"][count] = docs[i];
              count += 1;
              console.log(count);
            }
          }
        }
        console.log(result);

        res.json(result);
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    var col = db.get("mediaList");
    col
      .find({ userid: userid }, { sort: { _id: -1 } })
      .then((docs) => {
        num_of_shown = 3;
        num_of_item = docs.length;
        num_of_page = Math.ceil(num_of_item / num_of_shown);
        var result = {
          media: [],
          num_of_page: num_of_page,
        };
        var count = 0;
        for (i = 0; i < docs.length; i++) {
          if (i - num_of_shown * pagenum >= 0) {
            if (count < num_of_shown) {
              result["media"][count] = docs[i];
              count += 1;
              console.log(count);
            }
          }
        }
        console.log(result);
        res.json(result);
      })
      .catch((err) => {
        res.send(err);
      });
  }
});

// step 5 HTTP POST requests for http://localhost:8081/postlike
app.post("/postlike", express.urlencoded({ extended: true }), (req, res) => {
  var db = req.db;
  var col_user = db.get("userList");
  var col_media = db.get("mediaList");
  col_user
    .find({ _id: req.cookies.user_id })
    .then((docs) => {
      var liked = docs[0].username;
      col_media.find({ _id: req.body.photovideoid }).then((docs1) => {
        if (docs1[0].likedby.includes(liked)) {
          res.send(docs1[0].likedby);
        } else {
          col_media
            .update(
              { _id: req.body.photovideoid },
              { $push: { likedby: liked } }
            )
            .then(() => {
              col_media.find({ _id: req.body.photovideoid }).then((docs2) => {
                console.log(docs2);
                res.send(docs2[0].likedby);
              });
            });
        }
      });
    })
    /*col_media.update(
      { name: req.body.photovideoid },
      { $set: { likedby: docs[0].username } }
    );*/
    .catch((error) => {
      res.json({ msg: error });
    });
});

var server = app.listen(8081, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log("AlbumApp listening at http://%s:%s", host, port);
});

//HTTP GET requests for http://localhost:8081/load.
//The middleware checks if the “user_id” cookie has been set for the client.
//If not, send an empty string back to the client.
//Otherwise, retrieve username of the current user (according to the value of the “user_id” cookie),
//and username and _id of friends of the current user from the userList collection in the database;
//send all retrieved information as a JSON string to the client if the database operation is successful, and the error message if failure.
//You should decide the format of the JSON string and extract data from it accordingly in the client-side code to be implemented in Task 2.
