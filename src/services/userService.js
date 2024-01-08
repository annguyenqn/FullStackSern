import db from "../models/index"
// import Express from "express";
import bcrypt from 'bcryptjs'
const handldeUserLogin = async (email, pass) => {
    return new Promise(async (resolve, reject) => {
        const userData = {};
        const isExist = await checkUserEmail(email);
        try {
            if (isExist) {
                const user = await db.User.findOne({
                    // attibutes: ['email', 'roleid', 'password'],
                    where: { email: email },
                    raw: true

                })
                if (user) {
                    console.log('this is pass', pass);
                    console.log('this is userPass', user.password);
                    // let check = await bcrypt.compareSync(pass, user.password)
                    let check = true
                    if (pass !== user.password) {
                        check = false;
                    }
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessege = 'Ok';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessege = 'Wrong Password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessege = "User is not Found";
                }
                resolve(userData);

            } else {
                userData.errCode = 1;
                userData.errMessege = "Your email is not exist";
                resolve(userData)
            }

        } catch (e) {
            reject(e);
        }
    })
}
const checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handldeUserLogin: handldeUserLogin,
    checkUserEmail: checkUserEmail,
}