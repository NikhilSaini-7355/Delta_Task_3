const express = require('express');
const passport = require('passport');
const router = express.Router();
const Song = require('../models/Song');
const User = require('../models/User');
const Playlist = require('../models/PlayList');
const authMiddleware = require("../middleware/authMiddleware");

// passport.authenticate("user") is acting as a middleware here 
// so in actual auth flows make middleware  in place of passport.authenticate


router.get("/get/name/:UserName",authMiddleware,async (req,res)=>{
    // const songs = await Song.find({artist : req.user._id}).populate("artist");
    const {UserName} = req.params;
    let firstname=""; let lastname="";
    if(UserName.indexOf(' ')!=-1)
    {
         firstname = UserName.split(' ')[0];
         lastname = UserName.split(' ')[1];
    }
    else {
         firstname = UserName; 
    }
    
    const users = await User.find({
        $or : [{firstName : firstname},{lastName : lastname},{userName : firstname},{lastName : firstname}]
    });

    return res.status(200).json({
        data : users
    })
})

router.get("/get/userDetails/:userId",authMiddleware, async (req,res)=>{
     const {userId} = req.params;
     const currentUser = req.user;

     let user = await User.findOne({_id : userId}); // doubt here

     if(!user)
     {
        return res.status(301).json({
            error : "Invalid ID"
        })
     }

     let isFriend = false;

     if(user.friends.includes(req.user._id))
     {
        isFriend = true;
     }
     else {
        isFriend = false;
     }
     
     let isRequested = false;
     if(currentUser.sentFriendRequests.includes(userId))
     {
        isRequested = true;
     }
     else {
        isRequested = false;
     }

     return res.status(200).json({
        data : user,
        isFriend : isFriend,
        isRequested : isRequested
     });
})

router.get("/get/myFriends",authMiddleware, async (req,res)=>{
    if(!req.user.friends)
    {
      req.user.friends = [];
    }
    const currentUser = await User.findOne({_id : req.user._id}).populate("friends");
    return res.status(200).json({
        data : currentUser.friends
    })
})

router.get("/get/friendRequests",authMiddleware, async (req,res)=>{
    const user = await User.findOne({_id : req.user._id}).populate("receivedFriendRequests");
    if(!user)
    {
        return res.status(401).json({
            error : "user not exists"
        })
    }

    return res.status(200).json({
        data : user,
    })
})


router.get("/friends/:userId",authMiddleware,async (req,res)=>{
    const {userId} = req.params;
    const currentUser = req.user;
    if(currentUser.friends.includes(userId,0) || currentUser._id == userId)
    {
        const user2 = await User.findOne({_id : userId}).populate("friends");
        if(!user2)
            {
                return res.status(301).json({
                    error : "user does not exists"
                })
            }

        return res.status(200).json({
            data : user2.friends
        })
    }

    return res.status(401).json({
            error : "Current User do not has access to friends"
        })
});

// deleting songs and playlist api left

router.post("/friendRequest/send",authMiddleware, async (req,res)=>{
    const currentUser = req.user;
    const {friendId} = req.body;
    const friend = await User.findOne({_id : friendId});
    if(!friend || friendId==currentUser._id) 
    {
        return res.status(302).json({
            error : "Friend does not exists"
        })
    }

    try{
    currentUser.sentFriendRequests.push(friendId);
    await currentUser.save();

    friend.receivedFriendRequests.push(currentUser._id);
    await friend.save();

    return res.status(200).json({
        user : currentUser,
        friend : friend
    });
    }
    catch(e)
    {
        if(currentUser.sentFriendRequests.includes(friendId))
        {
            currentUser.sentFriendRequests.splice(currentUser.sentFriendRequests.indexOf(friendId),1);
            await currentUser.save();
        }
        if(friend.receivedFriendRequests.includes(currentUser._id))
            {
                friend.receivedFriendRequests.splice(friend.receivedFriendRequests.indexOf(currentUser._id),1);
                await friend.save();
            }

        console.log(friend);
        return res.status(401).json({
            error : e
        })
    }
    
})

router.post("/friendRequest/accept",authMiddleware, async (req,res)=>{
     const currentUser = req.user;
     const {friendId} = req.body;
     const friend = await User.findOne({_id : friendId});
     if(!friend || friendId == currentUser._id)
     {
        return res.status(302).json({
            error : "Friend does not exists"
        })
     }
    
    try
    {
        if(currentUser.receivedFriendRequests.includes(friendId) && friend.sentFriendRequests.includes(req.user._id))
            {
                currentUser.friends.push(friendId);
                friend.friends.push(currentUser._id);
                currentUser.receivedFriendRequests.splice(currentUser.receivedFriendRequests.indexOf(friendId),1);
                await currentUser.save();
                friend.sentFriendRequests.splice(friend.sentFriendRequests.indexOf(currentUser._id),1);
                await friend.save();

                return res.status(200).json({
                    friend : friend,
                    user : currentUser
                })
            }

            return res.status(301).json({
                error : "not authorized for this task"
            })
    }
     catch(e)
     {
        return res.status(401).json({
            error : e
        })
     }
})

router.post("/friendRequest/decline",authMiddleware, async (req,res)=>{
    const currentUser = req.user;
    const {friendId} = req.body;
    const friend = await User.findOne({_id : friendId});
    if(!friend || friendId == currentUser._id)
    {
       return res.status(302).json({
           error : "Friend does not exists"
       })
    }

    try
    {
        if(currentUser.receivedFriendRequests.includes(friendId) && friend.sentFriendRequests.includes(req.user._id))
            {
                currentUser.receivedFriendRequests.splice(currentUser.receivedFriendRequests.indexOf(friendId),1);
                await currentUser.save();
                friend.sentFriendRequests.splice(friend.sentFriendRequests.indexOf(currentUser._id),1);
                await friend.save();

                return res.status(200).json({
                    friend : friend,
                    user : currentUser
                })
            }

            return res.status(301).json({
                error : "not authorized for this task"
            })
    }
    catch(e)
     {
        return res.status(401).json({
            error : e
        })
     }
})

module.exports = router;
