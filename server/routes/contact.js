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
            res.render('contact/list',{title:'Contacts',ContactList:contactList});
        }
    });
});

// display add page
router.get('/add',(req,res,next) => {
    res.render('contact/add',{title:'Adding New Contact'});
});


// process add page
router.post('/add',(req,res,next) => {
    let newContact = Contact({
        "name":req.body.name,
        "number":req.body.number,
        "email":req.body.email
    });

    Contact.create(newContact,(err,Contact) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/contact-list');
        }
    });
});

// display edit page

router.get('/edit/:id',(req,res,next) => {
    let id=req.params.id;
    Contact.findById(id,(err,contactToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('contact/edit',{title:'Edit Contact',contact:contactToEdit});
        }
    });
});

// process edit page

router.post('/edit/:id',(req,res,next) => {
    let id=req.params.id;
    let updatedContact = Contact({
        "_id":id,
        "name":req.body.name,
        "number":req.body.number,
        "email":req.body.email
    });

    Contact.updateOne({_id:id},updatedContact,(err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/contact-list');
        }
    });
});

// Deleting contact

router.get('/delete/:id',(req,res,next) => {
    let id= req.params.id;

    Contact.remove({_id:id},(err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/contact-list');
        }
    });
});



module.exports = router;