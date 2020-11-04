const mongoose=require('mongoose');
const {isEmail}=require('validator');
const bcrypt =require('bcrypt');
//the general strecture of the elements in the database
const userschemer=new mongoose.Schema({
    email:{
        type: String,
        required:[true,'please enter an email'],
        unique:true,
        lowercase:true,
        Validate: [isEmail,'please enter a valid email']
    },
    password:{
        type: String,
        required:[true,'please enter a valid password'],
        minlength:[6,'minimum password length is 6'],
    },
});

userschemer.post('save',function(doc,next){
    console.log("new user created and saved",doc);
    next();
});

//fire a fonction before doc is saved to db(password hash)
userschemer.pre('save', async function(next){
    const salt=await bcrypt.genSalt();
    this.password= await bcrypt.hash(this.password,salt);
    next();
})
//exporting the other modules the strecture of the user
const User=mongoose.model('user',userschemer);
module.exports=User;
//static method for login
userschemer.statics.login=async function(email,password){
    const user = await this.findOne({ email });
    if(user){
        const auth = await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect mail')
}