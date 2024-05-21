const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        minLength: 5,
        required: true
    }
});

userSchema.pre('save',hashpassword);
userSchema.statics.login=login;

async function hashpassword(){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
}

async function login(username, password){
    let loginresult = null;
    try {
        const user = await this.findOne({username});
        if(user){
            const result = await bcrypt.compare(password, user.password);
            if(result){
                loginresult=user;
            }
        }
    } catch(error){
        console.log(error);
    }
    return loginresult;
}

const User = mongoose.model('User', userSchema);

module.exports=User;