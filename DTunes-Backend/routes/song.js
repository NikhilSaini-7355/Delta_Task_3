const express = require('express');
const passport = require('passport');
const router = express.Router();
const Song = require('../models/Song');
const User = require('../models/User');

// passport.authenticate("user") is acting as a middleware here 
// so in actual auth flows make middleware  in place of passport.authenticate

router.post("/create", passport.authenticate("jwt",{session : false}), async (req,res)=>{
     
    const {name, thumbnail, track} = req.body;
    if(!name || !thumbnail || !track)
        {
            return res.status(301).json({
                error : "Insufficient details to create the song "
            })
        }
    const artist = req.user._id;
    const songDetails = {name, thumbnail, track, artist};
    const createdSong = Song.create(songDetails);
    return res.status(200).json(createdSong.toJSON()); // he did createdSong

});

router.get("/get/mySongs",passport.authenticate("jwt",{session : false}),async (req,res)=>{
    const songs = await Song.find({artist : req.user._id});
    return res.status(200).json({
        data : songs
    })
})

router.get("/get/artist/:artistId",passport.authenticate("jwt",{session : false}), async (req,res)=>{
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
    
    const songs = await Song.find({artist : artistId});
    return res.status(200).json({
        data : songs
    })
});

router.get("/get/songName/:songName",passport.authenticate("jwt",{session : false}), async (req,res)=>{
    const {songName} = req.params;
    const songs = await Song.find({name : songName}); // pattern matching for songName left instead of exact matching

    return res.status(200).json({
        data : songs
    })
});

module.exports = router;
