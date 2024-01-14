const bcrypt = require('bcrypt');
let {users} = require("./userLoginService")
const SALT_ROUNDS = 10;

module.exports.register = async (req) => {
    const { username, password,userId } = req.body;
    users.forEach(user=>{
        if(user.username == username){
            return [400,{"message":"user already exists"}];
        }
    })
    console.log(username + " " + password)
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    users.push({ id: userId, username, password: hashedPassword });
    console.log(users);
    return [201, { message: 'User registered successfully',status:true }];
}