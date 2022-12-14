/* Insert User Entries */
var conn = new Mongo();
var db = conn.getDB("assignment1");

var username = ["Tom", "Kevin", "Amy", "Jack", "Bob", "Frank"]
var password = ["123456", "234561", "345612", "456123", "561234", "612345"]

db.userList.remove({});

for(let i=0; i < username.length; i++) {
    // be friends with each other
    var friends = []
    for (let j=0; j < username.length; j++){
        if(j != i)  friends.push(username[j])
    }

    db.userList.insert(
        {
            'username':username[i], 
            'password':password[i],
            'friends':friends,
        }
    )
}

/* Find user ids */
var user_info = {}

var users = db.userList.find({});
for (let i=0; i < username.length; i++){
    var uname = users[i]["username"]
    var _ids = users[i]['_id'].toString()
    var _id = _ids.split("\"")[1]
    user_info[uname] = _id
}

/* Insert Media Entries, emulate uploading actions */
db.mediaList.remove({});

var prefix = 'http://localhost:8081/media/'
db.mediaList.insert({'url':prefix+'Tom10.mp4', 'userid':user_info['Tom'], 'likedby':['Amy', 'Kevin']});
db.mediaList.insert({'url':prefix+'Tom1.jpg', 'userid':user_info['Tom'], 'likedby':['Amy', 'Bob']});
db.mediaList.insert({'url':prefix+'Tom2.jpg', 'userid':user_info['Tom'], 'likedby':['Amy', 'Bob']});
db.mediaList.insert({'url':prefix+'Tom3.jpg', 'userid':user_info['Tom'], 'likedby':['Amy']});
db.mediaList.insert({'url':prefix+'Tom4.jpg', 'userid':user_info['Tom'], 'likedby':[]});
db.mediaList.insert({'url':prefix+'Tom5.jpg', 'userid':user_info['Tom'], 'likedby':['Bob']});
db.mediaList.insert({'url':prefix+'Tom6.jpg', 'userid':user_info['Tom'], 'likedby':['Bob', 'Frank']});
db.mediaList.insert({'url':prefix+'Tom7.jpg', 'userid':user_info['Tom'], 'likedby':['Kevin']});
db.mediaList.insert({'url':prefix+'Tom8.jpg', 'userid':user_info['Tom'], 'likedby':['Bob', 'Frank']});
db.mediaList.insert({'url':prefix+'Tom9.jpg', 'userid':user_info['Tom'], 'likedby':['Amy', 'Bob', 'Kevin']});
db.mediaList.insert({'url':prefix+'Tom11.jpg', 'userid':user_info['Tom'], 'likedby':[]});
db.mediaList.insert({'url':prefix+'Tom12.jpg', 'userid':user_info['Tom'], 'likedby':['Bob', 'Kevin']});
db.mediaList.insert({'url':prefix+'Tom13.jpg', 'userid':user_info['Tom'], 'likedby':['Amy', 'Bob', 'Kevin']});
db.mediaList.insert({'url':prefix+'Tom14.jpg', 'userid':user_info['Tom'], 'likedby':[]});
db.mediaList.insert({'url':prefix+'Tom15.jpg', 'userid':user_info['Tom'], 'likedby':['Jack', 'Bob', 'Kevin']});
db.mediaList.insert({'url':prefix+'Tom16.jpg', 'userid':user_info['Tom'], 'likedby':['Bob', 'Kevin']});
db.mediaList.insert({'url':prefix+'Tom17.jpg', 'userid':user_info['Tom'], 'likedby':[]});
db.mediaList.insert({'url':prefix+'Tom18.jpg', 'userid':user_info['Tom'], 'likedby':['Amy', 'Bob', 'Kevin']});

db.mediaList.insert({'url':prefix+'Kevin1.jpg', 'userid':user_info['Kevin'], 'likedby':['Amy', 'Bob']});
db.mediaList.insert({'url':prefix+'Kevin2.jpg', 'userid':user_info['Kevin'], 'likedby':[]});
db.mediaList.insert({'url':prefix+'Kevin3.jpg', 'userid':user_info['Kevin'], 'likedby':['Amy']});
db.mediaList.insert({'url':prefix+'Kevin4.jpg', 'userid':user_info['Kevin'], 'likedby':['Amy', 'Frank']});
db.mediaList.insert({'url':prefix+'Kevin5.jpg', 'userid':user_info['Kevin'], 'likedby':['Amy', 'Bob']});
db.mediaList.insert({'url':prefix+'Kevin6.jpg', 'userid':user_info['Kevin'], 'likedby':['Jack']});
db.mediaList.insert({'url':prefix+'Kevin7.jpg', 'userid':user_info['Kevin'], 'likedby':['Amy']});
db.mediaList.insert({'url':prefix+'Kevin8.jpg', 'userid':user_info['Kevin'], 'likedby':['Amy', 'Frank']});
db.mediaList.insert({'url':prefix+'Kevin9.jpg', 'userid':user_info['Kevin'], 'likedby':['Amy', 'Bob']});
db.mediaList.insert({'url':prefix+'Kevin10.jpg', 'userid':user_info['Kevin'], 'likedby':['Jack']});
db.mediaList.insert({'url':prefix+'Kevin11.jpg', 'userid':user_info['Kevin'], 'likedby':['Amy']});
db.mediaList.insert({'url':prefix+'Kevin12.jpg', 'userid':user_info['Kevin'], 'likedby':['Amy', 'Frank']});
db.mediaList.insert({'url':prefix+'Kevin13.jpg', 'userid':user_info['Kevin'], 'likedby':['Amy', 'Bob']});
db.mediaList.insert({'url':prefix+'Kevin14.jpg', 'userid':user_info['Kevin'], 'likedby':['Jack']});
db.mediaList.insert({'url':prefix+'Kevin15.jpg', 'userid':user_info['Kevin'], 'likedby':['Amy']});
db.mediaList.insert({'url':prefix+'Kevin16.jpg', 'userid':user_info['Kevin'], 'likedby':['Amy', 'Frank']});
db.mediaList.insert({'url':prefix+'Kevin17.mp4', 'userid':user_info['Kevin'], 'likedby':['Amy', 'Frank']});
db.mediaList.insert({'url':prefix+'Kevin18.jpg', 'userid':user_info['Kevin'], 'likedby':['Amy', 'Frank']});
db.mediaList.insert({'url':prefix+'Kevin19.jpg', 'userid':user_info['Kevin'], 'likedby':['Amy', 'Frank']});
db.mediaList.insert({'url':prefix+'Kevin20.jpg', 'userid':user_info['Kevin'], 'likedby':['Amy', 'Frank']});

db.mediaList.insert({'url':prefix+'Amy1.jpg', 'userid':user_info['Amy'], 'likedby':['Bob']});
db.mediaList.insert({'url':prefix+'Amy2.jpg', 'userid':user_info['Amy'], 'likedby':[]});
db.mediaList.insert({'url':prefix+'Amy3.jpg', 'userid':user_info['Amy'], 'likedby':['Kevin']});
db.mediaList.insert({'url':prefix+'Amy4.jpg', 'userid':user_info['Amy'], 'likedby':['Bob', 'Frank']});
db.mediaList.insert({'url':prefix+'Amy11.mp4', 'userid':user_info['Amy'], 'likedby':['Kevin']});
db.mediaList.insert({'url':prefix+'Amy5.jpg', 'userid':user_info['Amy'], 'likedby':['Bob', 'Frank']});
db.mediaList.insert({'url':prefix+'Amy6.jpg', 'userid':user_info['Amy'], 'likedby':['Frank']});
db.mediaList.insert({'url':prefix+'Amy7.jpg', 'userid':user_info['Amy'], 'likedby':['Kevin']});
db.mediaList.insert({'url':prefix+'Amy8.jpg', 'userid':user_info['Amy'], 'likedby':['Bob', 'Frank', 'Kevin']});
db.mediaList.insert({'url':prefix+'Amy9.jpg', 'userid':user_info['Amy'], 'likedby':['Bob', 'Frank']});
db.mediaList.insert({'url':prefix+'Amy10.jpg', 'userid':user_info['Amy'], 'likedby':['Bob', 'Frank']});

db.mediaList.insert({'url':prefix+'Jack1.jpg', 'userid':user_info['Jack'], 'likedby':['Bob']});
db.mediaList.insert({'url':prefix+'Jack2.jpg', 'userid':user_info['Jack'], 'likedby':['Bob', 'Frank']});

db.mediaList.insert({'url':prefix+'Bob1.jpg', 'userid':user_info['Bob'], 'likedby':['Amy', 'Jack']});
db.mediaList.insert({'url':prefix+'Bob2.jpg', 'userid':user_info['Bob'], 'likedby':['Frank']});
db.mediaList.insert({'url':prefix+'Bob3.jpg', 'userid':user_info['Bob'], 'likedby':['Amy', 'Frank']});
db.mediaList.insert({'url':prefix+'Bob4.jpg', 'userid':user_info['Bob'], 'likedby':['Amy', 'Frank']});
db.mediaList.insert({'url':prefix+'Bob5.jpg', 'userid':user_info['Bob'], 'likedby':['Amy', 'Frank']});
db.mediaList.insert({'url':prefix+'Bob6.jpg', 'userid':user_info['Bob'], 'likedby':['Amy', 'Frank']});
db.mediaList.insert({'url':prefix+'Bob7.mp4', 'userid':user_info['Bob'], 'likedby':['Jack']});
db.mediaList.insert({'url':prefix+'Bob8.jpg', 'userid':user_info['Bob'], 'likedby':['Jack', 'Frank', 'Kevin']});

db.mediaList.insert({'url':prefix+'Frank1.jpg', 'userid':user_info['Frank'], 'likedby':['Amy', 'Bob']});
db.mediaList.insert({'url':prefix+'Frank2.jpg', 'userid':user_info['Frank'], 'likedby':['Jack']});
