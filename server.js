
const express = require('express')
const bodyparser = require('body-parser')
const PORT = 5000;
const app =express();
const db = require('./models/index.model')
const userRoutes = require('./routers/users.routes')
const classRoutes = require('./routers/classRoutes')
const studentRoutes = require('./routers/student.routes')
const teacherRoutes = require('./routers/teacher.routes')

const passport = require('passport')
const googleStretagy = require('passport-google-oauth20')
passport.use(new googleStretagy({
  clientID:"525514000319-ff7qvd05d8subocqcovt9mhtmv4s6ven.apps.googleusercontent.com",
  clientSecret:"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",
  callbackURL:"http://localhost:5000/auth/google/callback"
},function(accessToken, refreshToken, profile, done) {
  userProfile=profile;
  console.log(accessToken)
 // console.log(userProfile)
  
  
  return done(null, userProfile);
}))
var userProfile;

// const ensureAuth =(res,req,next)=>{
//   if(req.isAuthenticated()){
//     return next()
//   }else{
//     res.redirect
//   }
// }
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
app.use(express.json())
app.use(express.urlencoded({extended:true}))
 
db.sequelize.sync();

app.get("/auth/google/",passport.authenticate("google",{
  scope:["profile","email"]
}))

app.get("/auth/google/callback",passport.authenticate("google",{ failureRedirect: '/error' }),
(req, res)=>{
  // Successful authentication, redirect success.
   console.log(req.user,req.isAuthenticated());
//   res.send("user logged in")
  res.redirect('/success');
 // res.send("success")
})

app.get('/logout',(req,res)=>{
  req.logout();
  //console.log(req.user,req.isAuthenticated())
  res.send("user logged out")
  res.redirect('/');
})
app.get('/success', (req, res) => res.json("welcome to the app"));
app.get('/error', (req, res) => res.send("error logging in"));



app.use('/user',userRoutes)
app.use('/class',classRoutes)
app.use('/student',studentRoutes)
app.use('/teacher',teacherRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });