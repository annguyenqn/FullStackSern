import db from "../models/index"
// import Express from "express";
import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10);

const handldeUserLogin = async (email, pass) => {
    return new Promise(async (resolve, reject) => {
        const userData = {};
        //Check user exist
        const isExist = await checkUserEmail(email);
        try {
            if (isExist) {
                const user = await db.User.findOne({
                    attibutes: ['email', 'roleid', 'password', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true

                })
                //Nếu user chưa tồn tại thì thực hiện đoạn code dưới
                if (user) {
                    // console.log('this is pass', pass);
                    // console.log('this is userPass', user.password);
                    // dùng hàm compare để check lại user pass đã băm và pass do user nhập vào
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
    // trả về 1 promise
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId == 'ALL') {
                //nếu id  == All thì await model gọi hàm findAll trả về thông tin user 
                //Ngoại trừ password
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    },
                    raw: true
                })
            }
            if (userId && userId !== 'ALL') {
                //Nếu id != All thì tìm 1 user
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    },
                })
            }
            // thực hiện truy vấn thành công thì resolve về user get được
            resolve(users);
        } catch (e) {
            //Truy vấn thất bại thì reject err
            reject(e);
        }
    })
}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Biến checkEmail để check email dùng để create đã được khởi tạo trước đó hay chưa
            let checkEmail = await checkUserEmail(data.email);
            if (checkEmail === true) {
                resolve({
                    errCode: 1,
                    message: 'Your Email is already used'
                })
            } else {
                // Biến hashPass dùng để lưu password đã được băm 
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
            //Tìm user cần delete
            let user = await db.User.findOne({
                where: {
                    id: userId
                }
            })
            //Nếu user không tìm thấy thì trả về errCode:2
            if (!user) {
                resolve({
                    errCode: 2,
                    message: 'User not exist'
                })
            }
            if (user) {
                //Nếu user tìm thấy thì xóa user đó
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
//Hàm băm password đẻ lưu vào db
const hashUserPass = (pass) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Dùng bcrypt để hash pass
            let hashPassword = await bcrypt.hashSync(pass, salt);
            // Trả về password đã được băm
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