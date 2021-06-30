const jwt=require('jsonwebtoken');

require('dotenv').config();

function authToken(req,res,next){
    console.log("REQ HEADERS", req.headers);
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);
    if (token == null) {
      res.status(401).json({
        "error":err
      });
    }
  
    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
      if (err) {
        res.status(403).json({
          "error":err
        });
      }
      else
      {
        console.log(user);
        req.user = user;
        console.log(req.user);
        next();
      }
    });
  }

  module.exports = authToken;
    
