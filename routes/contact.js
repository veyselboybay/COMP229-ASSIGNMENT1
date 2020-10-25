let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Contact = require('../models/contact');

router.get('/',(req,res,next) => {
    Contact.find((err,contactList) => {
        if(err)
        {
            return console.log(err);
        }
        else
        {
            res.render('contact',{title:'Contact List',ContactList:contactList});
        }
    });
});

module.exports = router;