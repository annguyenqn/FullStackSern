import bcrypt from "bcryptjs"
import db from "../models/index"
const salt = bcrypt.genSaltSync(10);
const createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // const hashPass = await hashUserPass(data.password)
            await db.User.create({
                email: data.email,
                password: data.password,
                // password: hashPass,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === '1 ' ? true : false,
                roleid: data.roleid,
                phoneNumber: data.phoneNumber,
            })
            resolve('create user success');
        }
        catch (e) {
            reject(e);
        }
    })
    const hashPass = await hashUserPass(data.password)
    // console.log('data from service', data);
    // console.log('this hash pass', hashPass);
}
const getAllUser = () => {
    return new Promise((resolve, reject) => {
        try {
            const users = db.User.findAll();
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}
const getUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            });
            if (user) {
                resolve(user);
            }
            else {
                resolve([]);
            }
        } catch (e) {
            reject(e);
        }
    })
}
const updateUserById = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: {
                    id: data.id
                }
            })
            if (user) {
                user.firstName = data.firstName,
                    user.lastName = data.lastName
                await user.save();
                const users = await db.User.findAll()
                resolve(users);
            } else {
                resolve()
            }

        }
        catch (e) {
            reject(e);
        }
    })
}
const DeleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: userId },
            });
            if (user) {
                await user.destroy();
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserById: getUserById,
    updateUserById: updateUserById,
    DeleteUserById: DeleteUserById,

}
const hashUserPass = (pass) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync("B4c0/\/", salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e);
        }
    })
}