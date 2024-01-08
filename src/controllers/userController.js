import Express from "express";
import db from "../models/index"
import userService from "../services/userService";

const handleLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            messsage: 'Email or Password is missing'
        })
    }
    const userData = await userService.handldeUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        errMessege: userData.errMessege,
        user: userData.user ? userData.user : {}
    })
}


module.exports = {
    handleLogin: handleLogin
}