import Express from "express";
const router = Express.Router();
import homeController from "../controllers/homeController";
const initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCrud);
    router.post('/post-crud', homeController.postCrud);
    router.get('/get-crud', homeController.displayCrud);


    return app.use("/", router);
}
module.exports = initWebRoutes;