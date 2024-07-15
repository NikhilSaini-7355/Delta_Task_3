const express = require('express');
const router = express.Router();
const PlayList = require('../models/PlayList');
const passport = require('passport');
const User = require('../models/User');
const Song = require('../models/Song');
const authMiddleware = require('../middleware/authMiddleware');

router.post("/create",authMiddleware, async (req,res)=>{
    const currentUser = req.user;
    const {name, thumbnail, songs} = req.body;
    if(!name || !thumbnail || !songs)
        {
            return res.status(301).json({
                error : "Insufficient data"
            })
        }
    
    const playlistData = {name, thumbnail, songs, owner : currentUser._id, collaborators : [], };
    const playlist = await PlayList.create(playlistData);

    return res.status(200).json(playlist);
});

router.get("/get/playlist/:playlistId", authMiddleware, async (req,res)=>{
    const playlistId = req.params.playlistId;
    const playlist = await PlayList.findOne({ _id : playlistId}).populate({
        path:"songs",
        populate : {
             path : "artist",
        },
    });

    if(!playlist)
        {
            return res.status(301).json({
                error : "Invalid ID"
            })
        }
    
    return res.status(200).json(playlist);
});


router.get("/get/myPlaylists", authMiddleware, async (req,res)=>{
    const artistId = req.user._id;

    const playlists = await PlayList.find({owner : artistId}).populate("owner");
    return res.status(200).json({
        data : playlists
    });  
});



router.get("/get/artist/:artistId", authMiddleware, async (req,res)=>{
    const artistId = req.params.artistId;
    const artist = await User.findOne({ _id : artistId});
    if(!artist)
        {
            return res.status(301).json({
                error : "Invalid ID"
            });
        }

    const playlists = await PlayList.find({owner : artistId});
    return res.status(200).json({
        data : playlists
    });  
});

router.post("/add/song",authMiddleware, async (req,res)=>{
    const currentUser = req.user;
    const {playlistId , songId} = req.body;

    const playlist = await PlayList.findOne({_id : playlistId});
    if(!playlist)
        {
            return res.status(304).json({
                error : "Playlist does not exists"
            })
        }
    
    if(!playlist.owner.equals(currentUser._id) && !playlist.collaborators.includes(currentUser._id))
        {
            return res.status(400).json({
                error : "Not allowed"
            })
        }
    
    const song = await Song.findOne({_id : songId});
    if(!song)
        {
            return res.status(304).json({
                error : "Song does not exists"
            })
        }
    
    playlist.songs.push(songId);
    await playlist.save();
    return res.status(200).json(playlist);
});

module.exports = router;
