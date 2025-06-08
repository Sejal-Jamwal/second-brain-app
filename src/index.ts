import express from "express";
import mongoose from "mongoose";
import { User , Content , Links } from "./db";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { authMiddleware } from "./authentication";
import { hashFunction } from "./utils";
import cors from "cors";

mongoose.connect("mongodb://localhost:27017/brainly");

const app = express();

//Middleware used for parsing JSON payload from client to the server in POST, PUT and PATCH requests
app.use(express.json());
app.use(cors());


//SIGN UP ENDPOINT
app.post('/api/v1/signup', async function(req, res){

    //TO DO: ZOD VALIDATION AND HASH PASSWORDS
    //ADD STATUS CODES TOO.

    const username = req.body.username;
    const password = req.body.password;
      
    try {
     await User.create({
         username : username,
         password : password
    })

    res.json({
        msg : "You have successfully signed up!"
    })
} catch(e){
    res.status(411).json({
        msg : "User already exists!"
    })
}
      
})

//SIGN IN ENDPOINT
app.post('/api/v1/signin', async function(req, res){

    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({
         username : username,
         password : password
    })

    if(user){
        const token = jwt.sign({
          id: user._id
        }, JWT_SECRET);

        res.json({
            token : token,
        })
    }
    else{
       res.json({
          msg : "Incorrect username or password!"
       })
    }

})

//ADD NEW CONTENT ENDPOINT
app.post('/api/v1/content', authMiddleware, async function(req, res){
     
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;

    //@ts-ignore
    const userId = req.userId;

    await Content.create({
         link : link,
         type : type,
         title : title,
         tags : [],
         userId : userId
    })

    res.json({
        message : "Content added!"
    })

})

//GET THE CONTENT ENDPOINT
app.get('/api/v1/content', authMiddleware, async function(req, res){
     
    //@ts-ignore
    const userId = req.userId;

    const content = await Content.find({
        userId : userId
    }).populate("userId", "username");

    res.json({
        content
    })

})

//DELETE A CONTENT/DOCUMENT ENDPOINT
app.delete('/api/v1/content', authMiddleware, async function(req, res){ 
    //@ts-ignore
    const userId = req.userId;
    const contentId = req.body.contentId;
    
    await Content.deleteOne({
         contentId: contentId,
         userId : userId
    })

    res.json({
        message : "Deleted the course content!"
    })

})

//CREATING A SHAREABLE LINK FOR YOUR SECOND BRAIN
app.post('/api/v1/brain/share', authMiddleware, async function(req: any, res){
    
    const share = req.body.share;  // true
    const hash = hashFunction(10);

    if(share){
        await Links.create({
            hash : hash, // sejala2912
            userId : req.userId //sejal
             
     })
     
     res.json({
        msg : "sharing enabled",
        hash: hash
     })

    }
    else{
        await Links.deleteOne({
            userId : req.userId
        })

        res.json({
            msg : "sharing disabled"
        })
    }

})

//FETCH ANOTHER USERS SHARED BRAIN CONTENT
app.get('/api/v1/brain/:shareLink', async function(req, res){

    const hash = req.params.shareLink; //sejala2912

    const linkUser: any = await Links.findOne({
        hash : hash
    }); // sejal is the creator of the shareable link

    if(!linkUser){
        res.json({
            msg : "no user attached to this hash"
        })

        return ;
    }

    const userId = linkUser.userId ; //sejal

    const user : any = await User.findOne({
        _id : userId
    });

    if(!user){
        res.json({
            msg : "no such user exists in the database"
        })
    } // sejal is the creator of the shareable link but no longer exists in the database

    const content : any = await Content.find({
         userId : userId
    })
    
    res.json({
        username : user.username,
        content : content
    })

})

app.listen(3000);



