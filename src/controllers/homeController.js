import Express from "express";
import db from "../models/index"
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

module.exports = {
    getHomePage: getHomePage
}