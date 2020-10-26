let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema(
    {
        username:
        {
            type:String,
            default:'',
            trim:true,
            required:'Username is required.'
        },/*
        password:
        {
            type:String,
            default:'',
            trim:true,
            required:'password is required.'
        },*/
        email:
        {
            type:String,
            default:'',
            trim:true,
            required:'email is required.'
        },
        displayName:
        {
            type:String,
            default:'',
            trim:true,
            required:'displayName is required.'
        },
        created:
        {
            type:String,
            default:Date
        },
        created:
        {
            type:Date,
            default:Date.now
        }
    
    },
    {
        collection:"users"
    });

    let options = ({missingPasswordError:'Wrong/Missing password'});
    User.plugin(passportLocalMongoose,options);
    module.exports.User=mongoose.model('User',User);