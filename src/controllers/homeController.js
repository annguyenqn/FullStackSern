import Express from "express";
import db from "../models/index"
import CRUDservice from "../services/CRUDservice";
const getHomePage = async (req, res) => {
    try {
        const data = await db.User.findAll();
        console.log("this is data", data);
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
}
const getCrud = async (req, res) => {
    try {
        return res.render('crud.ejs');
    } catch (e) {
        console.log('crud err:', e);
    }
}
const postCrud = async (req, res) => {
    try {
        const mess = await CRUDservice.createNewUser(req.body);
        console.log(mess);
        // console.log(req.body);
        return res.render('crud.ejs');

    }
    catch (e) {
        console.log("post crud err:", e);
    }
}
const displayCrud = async (req, res) => {
    try {
        const data = await CRUDservice.getAllUser();
        // console.log("this is all user in controller", data);
        return res.render('displayCrud.ejs', {
            dataTable: data
        });
    } catch (e) {
        console.log(e);
    }
}
const getUser = async (req, res) => {
    const userId = req.query.id;
    console.log(userId);

    if (userId) {
        try {
            const userData = await CRUDservice.getUserById(userId);
            return res.render('updateCrud.ejs', {
                userData: userData
            })
        } catch (e) {
            console.log(e);
        }
    } else {
        return res.send('User not Found')
    }
    return res.send('this is update')

}
const editCrud = async (req, res) => {
    const userData = req.body;
    if (userData) {
        try {
            const allUser = await CRUDservice.updateUserById(userData);
            // console.log('this is all User updated', allUser);
            return res.render('displayCrud.ejs', {
                dataTable: allUser
            })
        } catch (e) {
            console.log(e);
        }
    } else {
        return res.send('Can not update ')
    }
    return res.send('this is update')
    // console.log('this is data update', userData);

}
const deleteCrud = async (req, res) => {
    const id = req.query.id;
    if (id) {
        await CRUDservice.DeleteUserById(id);
        const data = await CRUDservice.getAllUser();
        // console.log("this is all user in controller", data);
        return res.render('displayCrud.ejs', {
            dataTable: data
        });
        // return res.send('delete user success');
    } else {
        console.log('this is id', id);
        return res.send('User not found');

    }
}

module.exports = {
    getHomePage: getHomePage,
    getCrud: getCrud,
    postCrud: postCrud,
    displayCrud: displayCrud,
    editCrud: editCrud,
    getUser: getUser,
    deleteCrud: deleteCrud,
}