const User = require("../models/User");

async function handleUserSignUp(req,res)
{
    const {firstName,lastName,userName, email, password,likedSongs,likedPlaylists,subscribedArtists } = req.body;
    const newUser = await User.create({firstName,lastName,userName, email, password,likedSongs,likedPlaylists,subscribedArtists });
    return res.render("Home"); // not sure about this line
}

module.exports = {
    handleUserSignUp,
}