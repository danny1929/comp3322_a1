function init() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      if (xmlhttp.responseText == "") {
      } else {
        const obj = JSON.parse(xmlhttp.responseText);
        document.getElementById("login_info").style.display = "none";
        document.getElementById("welcome").innerHTML =
          "Hello " + obj.username + "!";
        document.getElementById("login_button").style.display = "none";
        document.getElementById("logout_button").style.display = "inline";

        el = document.createElement("li");
        el.innerHTML = "My Album";
        el.title = obj.username;
        el.setAttribute("onclick", "loadAlbum(event,0);");
        document.getElementById("friend_list").appendChild(el);
        localStorage.setItem(obj.username, 0);

        for (i = 0; i < obj.username_fd.length; i++) {
          el = document.createElement("li");
          el.innerHTML = obj.username_fd[i] + "'s Album";
          el.id = obj._id_fd[i];
          el.title = obj.username_fd[i];
          el.setAttribute("onclick", "loadAlbum(event,0);");
          localStorage.setItem(obj.username_fd[i], 0);

          document.getElementById("friend_list").appendChild(el);
        }
      }
    }
  };

  xmlhttp.open("GET", "/load", true);
  xmlhttp.send();
}

function login() {
  username = document.getElementById("username").value;
  password = document.getElementById("password").value;
  if (username == "" || password == "") {
    exit();
  } else {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        if (xmlhttp.responseText == "Login failure") {
          alert("Login failure");
        } else {
          // replace username and password input boxes by “Hello xx!”
          const obj = JSON.parse(xmlhttp.responseText);
          document.getElementById("login_info").style.display = "none";
          document.getElementById("welcome").innerHTML =
            "Hello " + username + "!";
          //“log out” button
          document.getElementById("login_button").style.display = "none";
          document.getElementById("logout_button").style.display = "inline";

          el = document.createElement("li");
          el.innerHTML = "My Album";
          el.title = username;
          el.setAttribute("onclick", "loadAlbum(event,0);");
          document.getElementById("friend_list").appendChild(el);
          localStorage.setItem(username, 0);

          for (i = 0; i < obj.username_fd.length; i++) {
            el = document.createElement("li");
            el.innerHTML = obj.username_fd[i] + "'s Album";
            el.id = obj._id_fd[i];
            el.title = obj.username_fd[i];
            el.setAttribute("onclick", "loadAlbum(event,1);");
            localStorage.setItem(obj.username_fd[i], 0);

            document.getElementById("friend_list").appendChild(el);
          }
        }
      }
    };
  }

  xmlhttp.open("POST", "/login", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("username=" + username + "&password=" + password);
}

function logout() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      if (xmlhttp.responseText == "") {
        document.getElementById("previous_next").style.display = "none";
        document.getElementById("login_info").style.display = "inline";
        document.getElementById("welcome").innerHTML = "";
        document.getElementById("friend_list").innerHTML = "";
        document.getElementById("login_button").style.display = "inline";
        document.getElementById("logout_button").style.display = "none";
        document.getElementById("gallery").innerHTML = "";

        //display the page view as in Fig. 1
        //Clear the data you have stored in localStorage
        window.localStorage.clear();
      }
    }
  };

  xmlhttp.open("GET", "/logout", true);
  xmlhttp.send();
}

//STEP 4

function loadAlbum(event, page) {
  document.getElementById("gallery").innerHTML = "";
  num_of_shown = 3;
  function isImage(link) {
    return /\.jpg$/.test(link);
  }
  function isVideo(link) {
    return /\.mp4$/.test(link);
  }

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var obj = JSON.parse(xmlhttp.responseText);
      // SET CONTENT
      for (i = 0; i < obj.media.length; i++) {
        contain_media = document.createElement("div");
        contain_media.className = "media";
        document.getElementById("gallery").append(contain_media);
        if (isImage(obj.media[i].url)) {
          image = document.createElement("img");
          image.id = obj.media[i]._id;
          image.setAttribute("src", obj.media[i].url);
          image.className = "image";
          image.setAttribute("onclick", "displayPhoto(event);");
          contain_media.append(image);
        }
        if (isVideo(obj.media[i].url)) {
          video = document.createElement("video");
          video.id = obj.media[i]._id;
          video.setAttribute("src", obj.media[i].url);
          video.className = "video";
          video.controls = "controls";
          video.setAttribute("onclick", "displayVideo(event);");
          contain_media.append(video);
        }
        comment = document.createElement("div");
        comment.className = "message";
        contain_media.append(comment);
        if (obj.media[i].likedby !== []) {
          likedby = "";
          for (j = 0; j < obj.media[i].likedby.length; j++) {
            if (j == obj.media[i].likedby.length - 1)
              likedby += obj.media[i].likedby[j];
            else likedby += obj.media[i].likedby[j] + ", ";
          }
          message = document.createElement("p");
          message.innerHTML = likedby + " liked the photo (or video)!";
          message.id = obj.media[i]._id + "_message";
          comment.append(message);
        }
        like_button = document.createElement("button");
        like_button.innerHTML = "like";
        like_button.name = obj.media[i]._id;
        like_button.setAttribute("onclick", "handleLike(event);");
        comment.append(like_button);
      }
      //NEXT PREVIOUS

      document.getElementById("previous").title = obj.media[0].userid;
      document.getElementById("next").title = obj.media[0].userid;

      if (event.target.id == "previous") {
        localStorage.setItem(
          localStorage.username,
          (Number(localStorage[username]) - 1).toString()
        );
        var previous = Number(localStorage[localStorage.username]) - 1;
        var next = Number(localStorage[localStorage.username]) + 1;
        localStorage.setItem("username", localStorage.username);
      } else {
        if (event.target.id == "next") {
          localStorage.setItem(
            localStorage.username,
            (Number(localStorage[username]) + 1).toString()
          );
          var previous = Number(localStorage[localStorage.username]) - 1;
          var next = Number(localStorage[localStorage.username]) + 1;
          localStorage.setItem("username", localStorage.username);
        } else {
          var name = event.target.title;
          var previous = Number(localStorage[name]) - 1;
          var next = Number(localStorage[name]) + 1;
          localStorage.setItem("username", name);
          localStorage.setItem(name, 0);
        }
      }

      document
        .getElementById("previous")
        .setAttribute("onclick", "loadAlbum(event, " + previous + ");");
      document
        .getElementById("next")
        .setAttribute("onclick", "loadAlbum(event, " + next + ");");

      if (page == 0) {
        document.getElementById("previous").style.pointerEvents = "none";
        document.getElementById("previous").style.color = "#a9a9a9";
      }
      if (obj.num_of_page == 1 && page == 0) {
        document.getElementById("previous").style.display = "none";
        document.getElementById("next").style.display = "none";
      }
      if (page == obj.num_of_page - 1) {
        document.getElementById("next").style.pointerEvents = "none";
        document.getElementById("next").style.color = "#a9a9a9";
      }
    }
    document.getElementById("previous_next").style.display = "block";
  };

  //SEND REQUEST
  if (event.target.innerHTML == "My Album") {
    xmlhttp.open("GET", "/getalbum?userid=0&pagenum=" + page, true);
    xmlhttp.send();
  }
  if (event.target.id == "previous" || event.target.id == "next") {
    xmlhttp.open(
      "GET",
      "/getalbum?userid=" + event.target.title + "&pagenum=" + page,
      true
    );
    xmlhttp.send();
  } else {
    xmlhttp.open(
      "GET",
      "/getalbum?userid=" + event.target.id + "&pagenum=" + page,
      true
    );
    xmlhttp.send();
  }
}

function displayPhoto(event) {
  document.getElementById("normal").style.display = "none";
  var modal = document.getElementById("myModal");

  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");
  modal.style.display = "contents";
  modalImg.src = event.target.src;
  captionText.innerHTML = document.getElementById(
    event.target.id + "_message"
  ).innerHTML;
  document.getElementById("modal-button").name = event.target.id;

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
    document.getElementById("normal").style.display = "block";
  };
}
function displayVideo(event) {
  document.getElementById("normal").style.display = "none";
  var modal = document.getElementById("myModal");

  var modalVideo = document.getElementById("vid01");
  var captionText = document.getElementById("caption");
  modal.style.display = "contents";
  modalVideo.src = event.target.src;
  captionText.innerHTML = document.getElementById(
    event.target.id + "_message"
  ).innerHTML;
  document.getElementById("modal-button").name = event.target.id;

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
    document.getElementById("normal").style.display = "block";
  };
}

function handleLike(event) {
  var xmlhttp = new XMLHttpRequest();
  photovideoid = event.target.name;

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      likedby_message = "";
      var likedby = JSON.parse(xmlhttp.responseText);
      for (i = 0; i < likedby.length; i++) {
        if (i == likedby.length - 1) likedby_message += likedby[i];
        else likedby_message += likedby[i] + ", ";
      }
      document.getElementById(event.target.name + "_message").innerHTML =
        likedby_message + " liked the photo (or video)!";
      document.getElementById("caption").innerHTML =
        likedby_message + " liked the photo (or video)!";
    }
  };

  xmlhttp.open("POST", "/postlike", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("photovideoid=" + photovideoid);
}
