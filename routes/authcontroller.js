const User=require('../models/user')
const jwt=require("jsonwebtoken");
const handleErrors=(err) =>{
    console.log(err.message,err.code);
    let errors={email:'',password:''};
    //incorrect email and password
    if(err.message==='incorrect email'){
        errors.email='that mail is not registred'
    }
    if(err.message==='incorrect password'){
        errors.email='the password is incorrect'
    }


    //duplicate error code

    if(err.code===11000){
        errors.email="that email is already in use";
    }
    if(err.message.includes('user validation failed')){
        console.log(Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message;
            return errors;
        }));
    }
}
//configure the general cookie rules
const maxage=3*24*60*60;
const createToken=(id) =>{
    return jwt.sign({id},'secremt',{
        expiresIn:maxage
    });
}

module.exports.signup_get=(req,res)=>{
    res.render('signup');
}

module.exports.login_get=(req,res)=>{
    res.render('login');
}

module.exports.signup_post= async (req,res)=>{
    //upon signing up create a cookie for the user
    const{email,password}=req.body;
    try{
        const user= await User.create({email,password})
        const token=createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxage*1000})
        res.status(201).json({user:user._id});
    }
    catch(err){
        handleErrors(err);
        res.status(400).json({errors});

    }
}

module.exports.login_post=async (req,res)=>{
    const {email,password}=req.body;
//login using the static function declared in the user module
    try{
        const user= await User.login(email,password);
        res.status(200).json({user: user._id});
        //create a cookie to inform the server that the user is indeed logged in
        const token=createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxage*1000})
        res.status(201).json({user:user._id});
    }
    catch(err){
        const errors =handleErrors(err);
        res.status(400).json({ errors });
    }

}

module.exports.logout_get=(req,res)=>{
    res.cookie('jwt','',{maxage:1});
    res.rediret('/');
}