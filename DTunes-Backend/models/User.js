const mongoose = require('mongoose');

const User = new mongoose.Schema({
    firstName : {
        type : String,
        required: true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    userName : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
        private : true
    },
    likedSongs : [
        {
        type : mongoose.Types.ObjectId,
        ref : "Song"
        }
        ],
    likedPlaylists : {
        type : String,
        default : ""
    },
    subscribedArtists : {
        type : String,
        default : ""
    },
    friends : [
        {
            type : mongoose.Types.ObjectId,
            ref : "User"
        }
    ],
    receivedFriendRequests : [
        {
            type : mongoose.Types.ObjectId,
            ref : "User"
        }
    ],
    sentFriendRequests : [
        {
            type : mongoose.Types.ObjectId,
            ref : "User"
        }
    ],
    profilePic : {
        type : String,
        default : "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
    },
    history:[
        {
        song : {
                type : mongoose.Types.ObjectId,
                ref: "Song"
               },
    date : {
        type : String,
           }
    }
]
});
// profilepic, history
const UserModel = mongoose.model("User",User);

module.exports = UserModel;