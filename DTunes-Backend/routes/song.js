const express = require('express');
const passport = require('passport');
const router = express.Router();
const Song = require('../models/Song');
const User = require('../models/User');
const authMiddleware = require("../middleware/authMiddleware");

// passport.authenticate("user") is acting as a middleware here 
// so in actual auth flows make middleware  in place of passport.authenticate

router.post("/create", authMiddleware, async (req,res)=>{
    const {name, thumbnail, track} = req.body;
    console.log("hellomodei");
    if(!name || !thumbnail || !track)
        {
            return res.status(301).json({
                error : "Insufficient details to create the song "
            })
        }
    const artist = req.user._id;
    const songDetails = {name, thumbnail, track, artist};
    const createdSong = await Song.create(songDetails);
    console.log(createdSong);
    return res.status(200).json(createdSong); // he did createdSong

});

router.get("/get/mySongs",authMiddleware,async (req,res)=>{
    const songs = await Song.find({artist : req.user._id}).populate("artist");
    return res.status(200).json({
        data : songs
    })
})

router.post("/like/:songId",authMiddleware,async (req,res)=>{
     const {isLiked} = req.body;
     const {songId} = req.params;
     const currentUser = req.user;
     if(!(isLiked==true) && !(isLiked==false))
        {
            return res.status(301).json({
                error : "Insufficient details to like the song "
            })
        }
    const song = await Song.findOne({_id:songId});
     
    if(!song)
        {
            return res.status(303).json({
                error : "song id is not correct "
            })
        }

    if(currentUser.likedSongs == undefined)
    {
        currentUser.likedSongs = [];
    }
    if(isLiked == true)
    {
        currentUser.likedSongs.push(songId);
        await currentUser.save();

        song.likes += 1;
        await song.save();
    }
    else if(isLiked == false)
    {
       let index =  currentUser.likedSongs.indexOf(songId);
       if(index>-1)
       {
          currentUser.likedSongs.splice(index,1);
          await currentUser.save();

          song.likes -= 1;
          await song.save();
       }
    }
    return res.status(200).json({
        Userdata : currentUser,
        songData : song
    })
})

router.get("/get/likedSongs",authMiddleware,async (req,res)=>{
      const currentUser = await User.findOne({_id: req.user._id}).populate({
        path : "likedSongs",
        populate : {
            path : "artist"
        }
      });
      return res.status(200).json({
         data : currentUser["likedSongs"]
      })
})


router.get("/get/artist/:artistId",authMiddleware, async (req,res)=>{
    const {artistId} = req.params;
    // ![] = false
    // !null = true
    // !undefined = true
    const artist = await User.findOne({_id : artistId});
    if(!artist)
        {
            return res.status(301).json({
                error : "Artist does not exists"
            })
        }
    
    const songs = await Song.find({artist : artistId}).populate("artist");
    return res.status(200).json({
        data : songs
    })
});

router.get("/get/songName/:songName",authMiddleware, async (req,res)=>{
    const {songName} = req.params;
    const songs = await Song.find({name : songName}).populate("artist"); // pattern matching for songName left instead of exact matching

    return res.status(200).json({
        data : songs
    });
    
});

// doubtful about visibility of songs to everyone or only to the friends
// router.get("/user/:userId",authMiddleware,async (req,res)=>{
//     const {userId} = req.params;
//     const currentUser = req.user;
//     if(currentUser.friends.includes(userId,0) || currentUser._id == userId)
//     {
//         const user2 = await User.findOne({_id : userId});
//         if(!user2)
//             {
//                 return res.status(301).json({
//                     error : "user does not exists"
//                 })
//             }
        
//         const songs = await Song.find({artist : userId});
//         return res.status(200).json({
//             data : songs
//         })
//     }
//     return res.status(401).json({
//         error : "Current User do not has access to songs"
//     })
// });


module.exports = router;
