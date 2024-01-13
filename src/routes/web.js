import Express from "express";
const router = Express.Router();
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
const initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCrud);
    router.post('/post-crud', homeController.postCrud);
    router.get('/get-crud', homeController.displayCrud);
    router.get('/get-user', homeController.getUser);
    router.post('/put-crud', homeController.editCrud);
    router.get('/delete-crud', homeController.deleteCrud);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-user', userController.handleGetAllUser);
    router.post('/api/create-new-user', userController.handleCreatenNewUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.put('/api/edit-user', userController.handleEditUser);










    return app.use("/", router);
}
module.exports = initWebRoutes;