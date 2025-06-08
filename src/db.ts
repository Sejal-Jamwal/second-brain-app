import mongoose from "mongoose"

const Schema = mongoose.Schema

const userSchema = new Schema({
     username : {type : String, required : true, unique : true},
     password : {type : String, required : true}
})

const User = mongoose.model('User', userSchema);

const tagsSchema = new Schema({
     title : {type : String, required: true, unique : true}
})

const Tags = mongoose.model('Tags', tagsSchema);

const contentSchema = new Schema({
      link : {type: String, required : true},
      type : {type: String, required : true},
      title : {type: String, required : true},
      tags : [{type : mongoose.Schema.Types.ObjectId, ref: 'Tags'}],
      userId : {type: mongoose.Schema.Types.ObjectId, ref: 'User', required : true}
})

const Content = mongoose.model('Content', contentSchema);

const linkSchema = new Schema({
     hash : { type: String, required: true, unique: true},
     userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required : true}
})

const Links = mongoose.model('Links', linkSchema);

export {
     User, 
     Content,
     Links,
     Tags
}

