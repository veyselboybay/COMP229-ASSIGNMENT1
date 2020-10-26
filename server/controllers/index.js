const passport = require('passport');
let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayLoginPage = (req,res,next) => {
    if(!req.render)
    {
        res.render('auth/login',{
            title:"Login",
            messages: req.flash('loginMessage'),
            displayName: req.user?req.user.displayName:''
        });

    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req,res,next) => {
    passport.authenticate('local',(err,user,info) =>{
        if(err)
        {
            return next(err);
        }
        if(!user)
        {
            req.flash('loginMessage','Authentication Error');
            return res.redirect('/login');
        }
        req.login(user,(err) => {
            if(err)
            {
                return next(err);
            }
            return res.redirect('/contact-list');
        });
    })(req,res,next);
}

module.exports.displayRegisterPage = (req,res,next) => {
    if(!req.user)
    {
        res.render('auth/register',{
            title:'Register',
            messages:req.flash('Register Message'),
            displayName: req.user?req.user.displayName:''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req,res,next) => {
    let newUser = new User({
        username:req.body.username,
        email: req.body.email,
        displayName:req.body.displayName
    });
    
    User.register(newUser,req.body.password,(err) => {
        if(err)
        {
            console.log('Error: Inserting new user');
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User already exists!'
                );
            }
            else
            {
                return res.render('auth/register',{
                    title:'Register',
                    messages:req.flash('registerMessage'),
                    displayName:req.user?req.user.displayName:''
                });
            }
        }
        else
        {
            return passport.authenticate('local')
            (req,res,() => {
                res.redirect('/contact-list');
            });
        }
    });
}

module.exports.performLogout = (req,res,next) => {
    req.logout();
    res.redirect('/');
}