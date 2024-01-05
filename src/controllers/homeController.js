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
        return res.send('postcrud');

    }
    catch (e) {
        console.log("post crud err:", e);
    }
}
const displayCrud = async (req, res) => {
    try {
        const data = await CRUDservice.getAllUser();
        console.log("this is all user in controller", data);
        return res.render('displayCrud.ejs', {
            dataTable: data
        });
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getHomePage: getHomePage,
    getCrud: getCrud,
    postCrud: postCrud,
    displayCrud: displayCrud,
}