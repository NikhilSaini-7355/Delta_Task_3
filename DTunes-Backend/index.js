const express = require('express');
const mongoose = require('mongoose');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const passport = require('passport');
const User = require('./models/User');
const authRoutes = require('./routes/auth');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 3000;

const songRoutes = require('./routes/song');
const playlistRoutes = require('./routes/playlist');

app.use(cors());
app.use(express.json());


const password = process.env.MONGO_PASSWORD;
// const URI = "mongodb+srv://nikhilsaini735510:"+password+"@cluster0.kigtde0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const URI = `mongodb+srv://admin:${password}@cluster0.kigtde0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(URI,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(()=>{
    console.log("connected to Mongo");
}).catch(()=>{
    console.log("not connected to mongo");
});



// authentication using passport will be removed and auth using your own manual way will be there just using passport for now only later will remove

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'anyRandomSecretKeyUseEnvVar';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));



app.get("/",(req,res)=>{
    res.send("Hello World");
})


app.use("/auth",authRoutes);
app.use("/song",songRoutes);
app.use("/playlist",playlistRoutes);

app.listen(port,()=>{
    console.log("App is running on port    " +port);
})