import Express from "express";
import db from "../models/index"
import userService from "../services/userService";

const handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
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

const handleGetAllUser = async (req, res) => {
    let id = req.query.id;
    let users = await userService.getAllUsers(id);
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessege: 'Missing required parameters',
            users: []
        })
    }
    if (users == null) {
        return res.status(200).json({
            errCode: 2,
            errMessege: 'User not exist',
            users: []
        })
    }
    console.log(users);
    return res.status(200).json({
        errCode: 0,
        errMessege: 'Ok',
        users
    })
}
const handleCreatenNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    console.log(message);
    return res.status(200).json(message);
}
const handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing parameter'
        });

    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}
const handleEditUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing parameter'
        });

    }
    let message = await userService.editUser(req.body);
    return res.status(200).json(message);

}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreatenNewUser: handleCreatenNewUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser
}