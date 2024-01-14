const userLoginService = require("../services/userLoginService")
const userRegisterService = require("../services/userRegisterService")

module.exports.login = async (req, res) => {
    try {
        // Compare the provided password with the hashed password from the database
        let [status,response] = await userLoginService.login(req);
        return res.status(status).send(response);
    } catch (error) {
        console.error(error);
        return res.status(400).send({message:error.message,status:false});
    }
}

module.exports.register = async (req, res) => {

    try {
        let [status,response] = await userRegisterService.register(req);
        return res.status(status).send(response);
    } catch (error) {
        console.error(error);
        return res.status(400).send({message:error.message,status:false});
    }
}