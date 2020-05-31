const router=require('express').Router();
const bcrypt = require("bcrypt");
let User=require('../models/user.model');
const jwt = require('jsonwebtoken')

let refreshTokens = []


router.post("/signup", (req, res, next) => {
    User.find({ username: req.body.username })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.json({
            message: "username exists"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                username: req.body.username,
                password: hash,
                firstname:req.body.firstname,
                lastname:req.body.lastname
              });
              user
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: "User created"
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
  });


router.post('/login', (req, res, next) => {
User.find({ username: req.body.username })
    .exec()
    .then(user => {
    if (user.length < 1) {
        return res.json({
        message: "Auth failed"
        });
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
        return res.status(401).json({
            message: "Auth failed"
        });
        }
        if (result) {
            const user1={name:req.body.username,_id:user[0]._id}
            const accessToken = generateAccessToken(user1)
            const refreshToken = jwt.sign(user1, process.env.REFRESH_TOKEN_SECRET)
            refreshTokens.push(refreshToken)
            res.json({ accessToken: accessToken, refreshToken: refreshToken,message :"auth succesfull"})
        
        }
    });
    })
    .catch(err => {
    console.log(err);
    res.status(500).json({
        error: err
    });
    });
});

router.post('/token', (req, res) => {
    const refreshToken = req.body.refreshToken
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      const accessToken = generateAccessToken({ name: user.name ,_id:user._id })
      res.json({ accessToken: accessToken })
    })
  })

router.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.refreshToken)
    res.json({message:"refreshToken deleted"})
  })

function generateAccessToken(user) {
return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
}


router.get('/editAuth', authenticateToken, (req, res) => {
  User.findById({_id:req.user._id}).exec().then(findone=> res.json(findone))
  .catch(err => console.log('error not found user'))
  })

function authenticateToken(req, res, next) {
const authHeader = req.headers['authorization']
const accesstoken = authHeader && authHeader.split(' ')[0]
if (accesstoken == null){
   return res.sendStatus(401)
}

jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err){

    return res.json({message:'fail'})
  }
    req.user = user
    next()
})
}

router.get('/getIDUsername',(req, res) => {
  const authHeader = req.headers['authorization']
  const accesstoken = authHeader && authHeader.split(' ')[0]
  if (accesstoken == null ){
     return res.sendStatus(401)
  }
  
  jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err)
         return res.json({message:'fail'})
      return res.json(user)
  })
})

router.post('/update', (req, res) => { 
User.findById({_id:req.body.id})
.then((user)=>{
  bcrypt.hash(req.body.password, 10, (err, hash) => {
  if (err) {
    return res.status(500).json({
      error: err
    });
  } else {
  user.username=user.username;
  user.password= hash;
  user.firstname=req.body.firstname;
  user.lastname=req.body.lastname;
  user.save()
  .then(()=>res.json("user updated"))
  .catch(error=>res.json(error));
}
})
})
})
module.exports=router;

