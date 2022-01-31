const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://zoclass:12345@cluster0.ngu0t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology:true,useFindAndModify:false,});
var conn =mongoose.Collection;
var studentUserSchema =new mongoose.Schema({
    school_key:
    {
        type:String,
    },
    student_name:{type:String,
    },
    email: {
        type:String, 
        },
    class_name: {
        type:Number, 
        },
    student_id:
    {
        type:Number,
    },
    pin:
    {
        type:Number,
        default:121212,
    },
    password: {
        type:String,
    },
    status:{type:String,
    },
    date:{
        type: Date, 
        default: Date.now }
});

var studentUserModel = mongoose.model('studentUser', studentUserSchema);
module.exports=studentUserModel;

