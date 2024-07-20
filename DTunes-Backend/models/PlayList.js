const mongoose = require('mongoose');

const PlayList = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    thumbnail : {
        type : String,
        required : true
    },
    owner : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
    songs :[
        {
        type : mongoose.Types.ObjectId,
        ref : "Song"
        }
        ],
    collaborators : [
        {
            type : mongoose.Types.ObjectId,
            ref : "User"
        }
    ],
    visibility : {
        type : String,
        default : "Public"
    }

});

const PlayListModel = mongoose.model("PlayList",PlayList);

module.exports = PlayListModel;