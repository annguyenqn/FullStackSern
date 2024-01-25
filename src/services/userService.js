import db from "../models/index"
// import Express from "express";
import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10);

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
                    let check = await bcrypt.compare(pass, user.password)
                    // let check = true
                    // if (pass !== user.password) {
                    //     check = false;
                    // }
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

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId == 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    },
                    raw: true

                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    },


                })

            }

            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkEmail = await checkUserEmail(data.email);
            if (checkEmail === true) {
                resolve({
                    errCode: 1,
                    message: 'Your Email is already used'
                })
            } else {
                let hashPass = await hashUserPass(data.password)
                await db.User.create({
                    email: data.email,
                    password: hashPass,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender === '1' ? true : false,
                    roleid: data.roleid,
                    phoneNumber: data.phoneNumber,
                })
                resolve({
                    errCode: 0,
                    message: 'Ok'
                });
            }

        }
        catch (e) {
            reject(e);
        }
    })
}
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: userId
                }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    message: 'User not exist'
                })
            }
            if (user) {
                await db.User.destroy({
                    where: {
                        id: userId
                    }
                })
                resolve({
                    errCode: 0,
                    message: 'Delete user success'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        // console.log('this is data edit', data);

        try {
            let user = await db.User.findOne({
                where: {
                    id: data.id,
                }, raw: false

            })
            if (user) {
                user.email = data.email;
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.phoneNumber = data.phoneNumber;
                // await console.log('this is user service', user);
                await user.save();
                resolve({
                    errCode: 0,
                    message: "Update User success"
                })
            }
            if (!user) {
                resolve({
                    errCode: 1,
                    message: "User is not exist"
                })
            }

        } catch (e) {
            reject(e);
        }

    })
}
const hashUserPass = (pass) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(pass, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e);
        }
    })
}

const getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessege: 'Missing required param'
                })
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: {
                        type: typeInput
                    }
                });
                // console.log('this is all code', allcode);
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }

        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    handldeUserLogin: handldeUserLogin,
    checkUserEmail: checkUserEmail,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    editUser: editUser,
    getAllCodeService: getAllCodeService
}